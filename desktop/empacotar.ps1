$ErrorActionPreference='Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
$version='45.2.1'
$archive="electron-v$version-win32-x64.zip"
$cache=Join-Path (Get-Location) 'tmp/electron'
New-Item -ItemType Directory -Force $cache | Out-Null
if(!(Test-Path "$cache/electron.zip")){
 & curl.exe -fL --retry 2 -o "$cache/electron.zip" "https://github.com/electron/electron/releases/download/v$version/$archive"
 if($LASTEXITCODE){throw 'Falha ao baixar Electron'}
}
& curl.exe -fsSL --retry 2 -o "$cache/SHASUMS256.txt" "https://github.com/electron/electron/releases/download/v$version/SHASUMS256.txt"
if($LASTEXITCODE){throw 'Falha ao obter checksums'}
$expected=(Get-Content "$cache/SHASUMS256.txt" | Where-Object {$_ -like "* *$archive"}).Split(' ')[0]
if((Get-FileHash "$cache/electron.zip" -Algorithm SHA256).Hash.ToLower() -ne $expected){throw 'Checksum divergente'}
& node node_modules/vite/bin/vite.js build
if($LASTEXITCODE){throw 'Build falhou'}
$destination=Join-Path (Get-Location) ('release/CAPS-'+(Get-Date -Format 'yyyyMMdd-HHmmss')+'-win-x64')
Expand-Archive -LiteralPath "$cache/electron.zip" -DestinationPath $destination
Rename-Item -LiteralPath "$destination/electron.exe" -NewName 'C.A.P.S.exe'
& "$PSScriptRoot/set-exe-icon.ps1" -Executable "$destination/C.A.P.S.exe" -Icon "$PSScriptRoot/caps.ico"
New-Item -ItemType Directory "$destination/resources/app" | Out-Null
Copy-Item -LiteralPath "$PSScriptRoot/main.cjs","$PSScriptRoot/package.json" -Destination "$destination/resources/app"
Copy-Item -LiteralPath "$PSScriptRoot/caps.ico" -Destination "$destination/resources/app"
Copy-Item -LiteralPath dist -Destination "$destination/resources/app" -Recurse
Copy-Item -LiteralPath "$PSScriptRoot/LEIA-ME.txt" -Destination $destination
Write-Output "Pronto: $destination/C.A.P.S.exe"
