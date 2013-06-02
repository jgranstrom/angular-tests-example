@echo off

set BASE_DIR=%~dp0

start node "%BASE_DIR%\web-server.js"
start karma start "%BASE_DIR%\..\config\karma-e2e.conf.js" %*