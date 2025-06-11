@echo off
echo Starting Health Pharmacy Frontend...

echo.
echo Step 1: Changing to frontend directory...
cd "C:\Users\Tanisha Chetani\Tanisha iit\Ealth Health website\frontend"

echo.
echo Step 2: Installing dependencies...
call npm install

echo.
echo Step 3: Starting React application...
echo The application will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the application
echo.
call npm start

pause 