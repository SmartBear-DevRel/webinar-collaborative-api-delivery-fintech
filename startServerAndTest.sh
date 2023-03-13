#!/bin/bash

SERVER_DIR=${SERVER_DIR:-'js'}
SERVER_COMMAND=${SERVER_COMMAND:-'kafka-server-start /opt/homebrew/etc/kafka/server.properties'}
CREATE_TOPIC_COMMAND=${CREATE_TOPIC_COMMAND:-'kafka-topics --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic test'}
# WAIT_FOR=${WAIT_FOR:-'http://localhost:7071'}

BASE_DIR=$PWD
SERVER_DIR=${SERVER_DIR:-$PWD}

start_server() {
    echo "Start server ..."
    cd $SERVER_DIR
    $SERVER_COMMAND &
    server_pid=$! && $CREATE_TOPIC_COMMAND && cd $BASE_DIR
}

stop_server() {
    echo "Stop Server ...$server_pid"
    kill -9 $server_pid
}

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

start_server

# ./wait-for $WAIT_FOR --timeout 60 -- ./launchReadyAPITestRunner.sh
./launchReadyAPITestRunner.sh
rc=$?

stop_server

exit $rc
