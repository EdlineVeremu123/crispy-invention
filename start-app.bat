@echo off
echo ==========================================
echo   CLINIC MANAGEMENT APP - SETUP SCRIPT
echo ==========================================
echo.

echo [1/4] Installing backend dependencies...
cd backend
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed
echo.

echo [2/4] Installing frontend dependencies...
cd ..\frontend
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed
echo.

echo [3/4] Starting backend server...
cd ..\backend
echo Starting backend on http://localhost:3000...
start /B npm start

echo.
echo [4/4] Starting frontend development server...
cd ..\frontend
echo Starting frontend on http://localhost:5173...
start /B npm run dev

echo.
echo ==========================================
echo ✅ SETUP COMPLETE!
echo ==========================================
echo.
echo Backend running on: http://localhost:3000
echo Frontend running on: http://localhost:5173
echo.
echo Open your browser and go to: http://localhost:5173
echo.
pause

