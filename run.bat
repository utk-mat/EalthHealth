@echo off
echo Starting Health Pharmacy Application...

echo.
echo 1. Starting Backend...
start cmd /k "mvn spring-boot:run"

echo.
echo 2. Starting Frontend...
cd frontend
start cmd /k "npm start"

echo.
echo Application is starting...
echo Backend will be available at: http://localhost:8080
echo Frontend will be available at: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul 