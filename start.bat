@echo off
chcp 65001 >nul
title Aventures Alpines - Démarrage

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║           DÉMARRAGE AVENTURES ALPINES                        ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

:: Vérifier npm
where npm >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] npm non trouvé. Installez Node.js depuis https://nodejs.org
    pause
    exit /b 1
)

:: Vérifier node_modules
if not exist "node_modules" (
    echo [INFO] Installation des dépendances...
    call npm install
)

echo [1/2] Démarrage du serveur API sur http://localhost:5000
start "API Aventures Alpines" cmd /k "npm run server"

timeout /t 3 /nobreak >nul

echo [2/2] Démarrage du frontend sur http://localhost:5173
start "Frontend Aventures Alpines" cmd /k "npm run dev"

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║  ✓ API:        http://localhost:5000                         ║
echo ║  ✓ Frontend:   http://localhost:5173                         ║
echo ║  ✓ phpMyAdmin: http://localhost/phpmyadmin                   ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Appuyez sur une touche pour ouvrir le navigateur...
pause >nul

start http://localhost:5173
