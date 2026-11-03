@echo off
setlocal
cd /d "%~dp0"
set "CAPS_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not exist "%CAPS_NODE%" (
  where node.exe >nul 2>nul
  if errorlevel 1 (
    echo Node nao encontrado. Consulte README.md para iniciar a mesa.
    pause
    exit /b 1
  )
  set "CAPS_NODE=node.exe"
)
if not exist "node_modules\vite\bin\vite.js" (
  echo Dependencias locais ausentes. Consulte README.md.
  pause
  exit /b 1
)
echo C.A.P.S. - Mesa local em http://127.0.0.1:5173/
echo Deixe esta janela aberta enquanto joga. Ctrl+C encerra o servidor.
echo Se a porta estiver ocupada, uma mesa pode ja estar aberta nesse endereco.
"%CAPS_NODE%" "node_modules\vite\bin\vite.js" --host 127.0.0.1 --port 5173 --strictPort --open
if errorlevel 1 pause
