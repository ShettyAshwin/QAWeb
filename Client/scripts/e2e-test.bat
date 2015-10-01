@echo off

REM Windows script for running e2e tests
REM You have to run server and capture some browser first
REM
REM Requirements:
REM - NodeJS (http://nodejs.org/)
REM - Karma (already contained in project's node_modules directory)

set BASE_DIR=%~dp0
%BASE_DIR%\..\app\node_modules\.bin\karma start "%BASE_DIR%\..\config\karma-e2e.conf.js" %*
