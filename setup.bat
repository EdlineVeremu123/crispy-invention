@echo off
echo Setting up Clinic Management Full-Stack Application
echo.

echo Installing backend dependencies...
cd backend
npm install
echo.

echo Installing frontend dependencies...
cd ..\frontend
npm install
echo.

echo Setup complete!
echo.
echo To run the application:
echo 1. Start the backend: cd backend && npm start
echo 2. In another terminal, start the frontend: cd frontend && npm run dev
echo.
echo Backend will run on: http://localhost:3000
echo Frontend will run on: http://localhost:5173
