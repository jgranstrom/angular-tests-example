@echo off

set BASE_DIR=%~dp0

karma start "%BASE_DIR%\..\config\karma.conf.js" %*