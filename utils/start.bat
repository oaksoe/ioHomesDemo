@echo off

title Run ioHomes apps and processes
echo ioHomes apps and processes
echo Make sure that redis and rabbitmq servers are running
start rundb.bat
timeout 5
start runserver.bat "proxy server" "../servers/proxy"
start runserver.bat "auth server" "../servers/auth"
start runserver.bat "api server" "../servers/api"
start runserver.bat "iot server" "../servers/iot"
start runserver.bat "cron server" "../servers/cron"
start runserver.bat "ml prep server" "../servers/ml/prep"
