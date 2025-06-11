@echo off
echo Starting Health Pharmacy Backend...

echo.
echo Step 1: Changing to project directory...
cd "C:\Users\Tanisha Chetani\Tanisha iit\Ealth Health website"

echo.
echo Step 2: Cleaning and building project...
call mvn clean install

echo.
echo Step 3: Starting Spring Boot application...
echo The application will be available at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the application
echo.
call mvn spring-boot:run

pause 