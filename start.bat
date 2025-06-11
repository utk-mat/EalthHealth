@echo off
echo Starting Health Pharmacy Application...

echo.
echo Step 1: Starting Backend...
cd "%~dp0"
call mvn clean install
start cmd /k "mvn spring-boot:run"

echo.
echo Step 2: Starting Frontend...
cd frontend
call npm install
start cmd /k "npm start"

echo.
echo Application is starting...
echo Please wait for both servers to start...
echo.
echo Backend will be available at: http://localhost:8080
echo Frontend will be available at: http://localhost:3000
echo.
echo If you see any errors, please check:
echo 1. MySQL is running
echo 2. Java 17 is installed
echo 3. Node.js is installed
echo 4. Maven is installed
echo.
echo Press any key to exit this window...
pause > nul 