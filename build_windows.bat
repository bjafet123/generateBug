@echo off
set prefix="cloudgenuser"
for /f %%i in ('npm pkg get name') do set name=%%i
for /f %%i in ('npm pkg get version') do set tag=%%i

set name_docker="%prefix%/%name%":"%tag%"

docker build -t %name_docker% .
docker push %name_docker%
