@echo off
chcp 65001 >nul
title Installation Aventures Alpines - UwAmp

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║       INSTALLATION AVENTURES ALPINES - UwAmp                 ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

:: Configuration
set "UWAMP_PATH=C:\UwAmp"
set "WWW_PATH=%UWAMP_PATH%\www"
set "PROJECT_NAME=Aventure-Alpine"
set "PROJECT_PATH=%WWW_PATH%\%PROJECT_NAME%"
set "MYSQL_PATH=%UWAMP_PATH%\bin\database\mysql-8.0.30\bin"
set "DB_NAME=aventures_alpines"
set "DB_USER=root"
set "DB_PASSWORD=root"

:: Vérifier si UwAmp existe
if not exist "%UWAMP_PATH%" (
    echo [ERREUR] UwAmp non trouvé dans %UWAMP_PATH%
    echo Modifiez la variable UWAMP_PATH dans ce script.
    pause
    exit /b 1
)

echo [1/6] Vérification de UwAmp...
echo       ✓ UwAmp trouvé dans %UWAMP_PATH%
echo.

:: Copier le projet si nécessaire
echo [2/6] Copie du projet vers UwAmp...
if exist "%PROJECT_PATH%" (
    echo       Le projet existe déjà dans %PROJECT_PATH%
    choice /C ON /M "       Voulez-vous le remplacer ? (O=Oui, N=Non)"
    if errorlevel 2 goto skip_copy
    rmdir /S /Q "%PROJECT_PATH%" 2>nul
)

xcopy "%~dp0" "%PROJECT_PATH%\" /E /I /H /Y /Q
echo       ✓ Projet copié vers %PROJECT_PATH%
:skip_copy
echo.

:: Créer le fichier .env
echo [3/6] Configuration du fichier .env...
(
echo # Configuration MySQL pour UwAmp
echo MYSQL_HOST=127.0.0.1
echo MYSQL_USER=%DB_USER%
echo MYSQL_PASSWORD=%DB_PASSWORD%
echo MYSQL_DATABASE=%DB_NAME%
echo MYSQL_PORT=3306
echo.
echo # Configuration serveur
echo NODE_ENV=development
echo PORT=5000
echo.
echo # JWT Secret
echo JWT_SECRET=aventures_alpines_secret_jwt_2024_uwamp
) > "%PROJECT_PATH%\.env"
echo       ✓ Fichier .env créé
echo.

:: Créer la base de données MySQL
echo [4/6] Création de la base de données MySQL...
echo       Vérifiez que UwAmp est démarré (MySQL actif)
echo.

:: Vérifier si MySQL est accessible
if exist "%MYSQL_PATH%\mysql.exe" (
    echo       Utilisation de MySQL depuis UwAmp...
    
    :: Créer la base de données
    "%MYSQL_PATH%\mysql.exe" -u%DB_USER% -p%DB_PASSWORD% -e "CREATE DATABASE IF NOT EXISTS %DB_NAME% CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>nul
    
    if errorlevel 1 (
        echo       [!] Erreur MySQL - Essai sans mot de passe...
        "%MYSQL_PATH%\mysql.exe" -u%DB_USER% -e "CREATE DATABASE IF NOT EXISTS %DB_NAME% CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>nul
    )
    
    :: Importer le schéma
    echo       Import du schéma SQL...
    "%MYSQL_PATH%\mysql.exe" -u%DB_USER% -p%DB_PASSWORD% %DB_NAME% < "%PROJECT_PATH%\server\db\schema.sql" 2>nul
    
    if errorlevel 1 (
        "%MYSQL_PATH%\mysql.exe" -u%DB_USER% %DB_NAME% < "%PROJECT_PATH%\server\db\schema.sql" 2>nul
    )
    
    echo       ✓ Base de données créée et schéma importé
) else (
    echo       [!] MySQL CLI non trouvé dans %MYSQL_PATH%
    echo       Importez manuellement schema.sql via phpMyAdmin
    echo       URL: http://localhost/phpmyadmin
)
echo.

:: Installer les dépendances Node.js
echo [5/6] Installation des dépendances Node.js...
cd /d "%PROJECT_PATH%"

where npm >nul 2>&1
if errorlevel 1 (
    echo       [!] npm non trouvé dans le PATH
    echo       Installez Node.js depuis https://nodejs.org
    echo       Puis relancez ce script ou exécutez:
    echo       cd %PROJECT_PATH%
    echo       npm install
    echo       npm run server
) else (
    call npm install
    echo       ✓ Dépendances installées
)
echo.

:: Résumé
echo [6/6] Installation terminée !
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                      RÉSUMÉ                                  ║
echo ╠══════════════════════════════════════════════════════════════╣
echo ║  Projet:     %PROJECT_PATH%
echo ║  Base:       %DB_NAME%
echo ║  phpMyAdmin: http://localhost/phpmyadmin
echo ║  API:        http://localhost:5000 (après npm run server)
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Pour démarrer le serveur:
echo   cd %PROJECT_PATH%
echo   npm run server
echo.
echo Pour démarrer le frontend:
echo   npm run dev
echo.

pause
