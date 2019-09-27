@echo off

taskkill /IM node.exe >nul

echo Zmiana lokalizacji...
cd /d "e:\WRKT_APP\WorkoutAPP"

echo Uruchamianie serwera...

start /min node app.js 

echo Uruchamianie aplikacji...