@echo off
echo Serving from: %~dp0
echo Open http://localhost:8080 in your browser
echo.
where python3 >nul 2>nul
if %errorlevel% equ 0 (
  python3 -m http.server 8080 --directory "%~dp0"
  goto :eof
)
where python >nul 2>nul
if %errorlevel% equ 0 (
  python -m http.server 8080 --directory "%~dp0"
  goto :eof
)
echo Error: need python3 or python installed
pause
