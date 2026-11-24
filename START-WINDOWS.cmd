@echo off
cd /d "%~dp0"
echo.
echo  MORROW COFFEE - THE SLOW HOUSE V5

echo.
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js not found. Please install Node.js 20 LTS or later.
  pause
  exit /b 1
)
if not exist "node_modules\vite\package.json" (
  echo Installing project dependencies...
  call npm install --include=dev
  if errorlevel 1 (
    echo.
    echo Dependency installation failed. Check the npm error output and internet access.
    pause
    exit /b 1
  )
)
echo Starting Vite. Open the local URL shown below in your browser.
call npm run dev
pause
