@echo off
echo Arret des instances Vite existantes...
taskkill /F /IM node.exe /T >nul 2>&1
timeout /t 1 /nobreak >nul

echo Demarrage du frontend avec le backend Render...
echo Backend: https://aventure-alpine.onrender.com

set VITE_API_URL=https://aventure-alpine.onrender.com
npm run dev
