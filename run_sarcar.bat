@echo off
echo ========================================================
echo        STARTING SAR CAR LUXURY AUTOMOTIVE PLATFORM
echo ========================================================
echo.
echo Starting FastAPI Python Backend on http://localhost:8000 ...
start "SAR CAR Backend" cmd /k "cd backend && python -m uvicorn main:app --reload --port 8000"
echo.
echo Starting Vite React Frontend on http://localhost:3000 ...
start "SAR CAR Frontend" cmd /k "cd frontend && npm run dev"
echo.
echo All services launched!
echo Open your browser to: http://localhost:3000
echo ========================================================
pause

