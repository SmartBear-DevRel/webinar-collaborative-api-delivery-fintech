#!/bin/bash

SERVER_DIR=${SERVER_DIR:-'LocalFunctionProj'}
SERVER_COMMAND=${SERVER_COMMAND:-'func start --csharp'}
WAIT_FOR=http://localhost:7071

BASE_DIR=$PWD
SERVER_DIR=${SERVER_DIR:-$PWD}

start_server() {
    echo "Start server ..."
    cd $SERVER_DIR
    $SERVER_COMMAND &
    server_pid=$! && cd $BASE_DIR
}

stop_server() {
    echo "Stop Server ...$server_pid"
    kill -9 $server_pid
}

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

start_server

./wait-for $WAIT_FOR --timeout 60 -- ./launchReadyAPITestRunner.sh

rc=$?

stop_server

exit $rc
