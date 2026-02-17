@echo off
setlocal enabledelayedexpansion

title WzAstro Asset Downloader
color 0f

echo ==========================================================
echo                WzAstro Offline Asset Downloader
echo ==========================================================
echo.
echo This script will download all necessary astrology chart images
echo into an "assets" folder in the current directory.
echo.
echo Please ensure you have an internet connection.
echo.
pause

if not exist "assets" (
    mkdir "assets"
    echo [OK] Created 'assets' directory.
) else (
    echo [INFO] 'assets' directory already exists.
)

cd assets

set "BASE_URL=https://www.soilastro.com/uploads/archive"
set "LAYERS=asc mn su mu ve ma ju sa ur ne pl"

echo.
echo Starting download...
echo.

for %%L in (%LAYERS%) do (
    for /L %%I in (1,1,12) do (
        set "FILENAME=%%L%%I.png"
        
        if exist "!FILENAME!" (
            echo [SKIP] !FILENAME! already exists.
        ) else (
            echo [DOWNLOADING] !FILENAME!...
            curl -s -f -O "!BASE_URL!/!FILENAME!"
            if errorlevel 1 (
                echo [ERROR] Failed to download !FILENAME!
            )
        )
    )
)

echo.
echo ==========================================================
echo                    Download Complete!
echo ==========================================================
echo.
echo 1. You should now see all .png files in the "assets" folder.
echo 2. Keep the "assets" folder next to your index.html file.
echo.
pause
