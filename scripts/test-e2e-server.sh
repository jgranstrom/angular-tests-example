#!/bin/bash

BASE_DIR=`dirname $0`

node %BASE_DIR%\web-server.js &
karma start $BASE_DIR/../config/karma.conf.js $* &