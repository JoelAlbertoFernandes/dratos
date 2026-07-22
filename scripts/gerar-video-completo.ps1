param(
  [string]$Ffmpeg = "ffmpeg",
  [string]$Ffprobe = "ffprobe"
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$videoRoot = Join-Path $projectRoot "assets\video"
$posterRoot = Join-Path $videoRoot "posters"
$workRoot = Join-Path ([System.IO.Path]::GetTempPath()) "dratos-video-completo"
$outputVideo = Join-Path $videoRoot "dratos-apresentacao-completa.mp4"
$outputPoster = Join-Path $posterRoot "dratos-apresentacao-completa.webp"

$inputs = @(
  "01-abertura.mp4",
  "02-caos-invisivel.mp4",
  "03-custo-oculto.mp4",
  "04-nasce-dratos.mp4",
  "05-hub-central.mp4",
  "06-requisicao.mp4",
  "07-autoria.mp4",
  "08-biblioteca.mp4",
  "09-sala-juridica.mp4",
  "10-due-diligence.mp4",
  "11-aprovacoes-assinatura.mp4",
  "12-contrato-vivo.mp4",
  "13-performance.mp4",
  "14-dossie.mp4",
  "15-dashboard.mp4",
  "16-encerramento.mp4"
)

foreach ($name in $inputs) {
  $path = Join-Path $videoRoot $name
  if (-not (Test-Path -LiteralPath $path)) { throw "Vídeo ausente: $path" }
}

$tempBase = [System.IO.Path]::GetFullPath([System.IO.Path]::GetTempPath())
$resolvedWorkRoot = [System.IO.Path]::GetFullPath($workRoot)
if (-not $resolvedWorkRoot.StartsWith($tempBase, [System.StringComparison]::OrdinalIgnoreCase) -or (Split-Path -Leaf $resolvedWorkRoot) -ne "dratos-video-completo") {
  throw "Pasta temporária recusada por segurança: $resolvedWorkRoot"
}
if (Test-Path -LiteralPath $resolvedWorkRoot) { Remove-Item -LiteralPath $resolvedWorkRoot -Recurse -Force }
New-Item -ItemType Directory -Path $workRoot | Out-Null
New-Item -ItemType Directory -Path $posterRoot -Force | Out-Null

$normalized = @()
for ($index = 0; $index -lt $inputs.Count; $index++) {
  $source = Join-Path $videoRoot $inputs[$index]
  $segment = Join-Path $workRoot ("segment-{0:D2}.mp4" -f ($index + 1))
  $durationText = & $Ffprobe -v error -show_entries format=duration -of default=nokey=1:noprint_wrappers=1 $source
  if ($LASTEXITCODE -ne 0) { throw "FFprobe falhou para $source" }
  $duration = [double]::Parse($durationText.Trim(), [System.Globalization.CultureInfo]::InvariantCulture)
  $fadeOut = [Math]::Max(0, $duration - 0.12).ToString("0.000", [System.Globalization.CultureInfo]::InvariantCulture)
  $videoFilter = "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30,format=yuv420p,fade=t=in:st=0:d=0.12,fade=t=out:st=${fadeOut}:d=0.12"
  $audioFilter = "aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,afade=t=in:st=0:d=0.06,afade=t=out:st=${fadeOut}:d=0.06"
  & $Ffmpeg -y -i $source -vf $videoFilter -af $audioFilter -c:v libx264 -preset medium -crf 19 -profile:v high -level 4.0 -c:a aac -b:a 192k -ar 48000 -movflags +faststart $segment
  if ($LASTEXITCODE -ne 0) { throw "FFmpeg falhou ao normalizar $source" }
  $normalized += $segment
}

$transition = Join-Path $workRoot "transition.mp4"
& $Ffmpeg -y -f lavfi -i "color=c=black:s=1280x720:r=30:d=0.10" -f lavfi -i "anullsrc=r=48000:cl=stereo" -t 0.10 -c:v libx264 -preset medium -crf 19 -profile:v high -level 4.0 -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 $transition
if ($LASTEXITCODE -ne 0) { throw "FFmpeg falhou ao criar a transição" }

$concatFile = Join-Path $workRoot "concat.txt"
$concatLines = @()
for ($index = 0; $index -lt $normalized.Count; $index++) {
  $safeSegment = $normalized[$index].Replace("'", "''")
  $concatLines += "file '$safeSegment'"
  if ($index -lt $normalized.Count - 1) {
    $safeTransition = $transition.Replace("'", "''")
    $concatLines += "file '$safeTransition'"
  }
}
Set-Content -LiteralPath $concatFile -Value $concatLines -Encoding ASCII

& $Ffmpeg -y -fflags +genpts -f concat -safe 0 -i $concatFile -vf "fps=30,format=yuv420p" -af "aresample=48000:async=1:first_pts=0" -c:v libx264 -preset medium -crf 19 -profile:v high -level 4.0 -c:a aac -b:a 192k -ar 48000 -movflags +faststart $outputVideo
if ($LASTEXITCODE -ne 0) { throw "FFmpeg falhou ao concatenar o vídeo completo" }

& $Ffmpeg -y -ss 3.0 -i $outputVideo -frames:v 1 -vf "scale=1280:720" -c:v libwebp -quality 88 $outputPoster
if ($LASTEXITCODE -ne 0) { throw "FFmpeg falhou ao gerar o poster" }

$finalDuration = & $Ffprobe -v error -show_entries format=duration -of default=nokey=1:noprint_wrappers=1 $outputVideo
Write-Output "Vídeo: $outputVideo"
Write-Output "Poster: $outputPoster"
Write-Output "Duração: $($finalDuration.Trim()) segundos"
