@echo off
taskkill.exe /F /IM chrome.exe

supervisor -i ./logs -w ./app.js app.js