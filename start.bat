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
    echo.
)

echo ╔══════════════════════════════════════════════════════════════╗
echo ║  API:        http://localhost:5000                           ║
echo ║  Frontend:   http://localhost:5173                           ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo [1/2] Démarrage du serveur API...
start "API Aventures Alpines" /min cmd /c "npm run server"
echo [API] Serveur lancé (fenêtre minimisée)

timeout /t 3 /nobreak >nul

echo [2/2] Démarrage du frontend Vite...
echo.

:: Ouvrir le navigateur après un court délai
start "" cmd /c "timeout /t 5 /nobreak >nul & start http://localhost:5173"

echo ══════════════════════ LOGS ══════════════════════════════════
echo.

:: Le frontend s'exécute au premier plan pour afficher les logs
call npm run dev
