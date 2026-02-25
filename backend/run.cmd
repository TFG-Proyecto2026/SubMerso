@echo off
REM Arranca el backend con perfil local (MongoDB Atlas)
cd /d "%~dp0"
call mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=local"
pause
