@echo off
echo Starting Health Pharmacy Application...

echo.
echo Step 1: Starting MongoDB...
echo Checking if MongoDB is running...
mongod --version
if %errorlevel% neq 0 (
    echo Error: MongoDB is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Step 2: Starting Backend...
cd "%~dp0"
call mvn clean install
start cmd /k "mvn spring-boot:run"

echo.
echo Step 3: Starting Frontend...
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
echo 1. MongoDB is running
echo 2. Port 8080 is available for backend
echo 3. Port 3000 is available for frontend
echo.
echo Press any key to exit this window...
pause > nul 