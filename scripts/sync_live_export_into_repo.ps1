param(
    [string]$SourceDir
)

if (-not $SourceDir) {
    throw "Usage: sync_live_export_into_repo.ps1 -SourceDir <export-folder>"
}

$repoRoot = "C:\Users\ich\Documents\OWRX Codex\OWRXP-DNX"
$targetDir = Join-Path $repoRoot "patches\live-export"

New-Item -ItemType Directory -Force -Path $targetDir | Out-Null

$files = @(
    "openwebrx.js",
    "custom.css",
    "init.js",
    "dnx_matrix.js",
    "dnx_matrix.css"
)

foreach ($file in $files) {
    $src = Join-Path $SourceDir $file
    if (Test-Path $src) {
        Copy-Item -LiteralPath $src -Destination (Join-Path $targetDir $file) -Force
    }
}

Write-Host "Live export synced into $targetDir"
