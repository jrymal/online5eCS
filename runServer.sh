#! /bin/sh

file=python-server.PID

case $1 in
    start )
        python -m SimpleHTTPServer 8080 &
        PID=$!
        echo $PID > $file
        ;;
    stop )
        if [ -f $file ]; then
            kill $(cat $file)
            rm $file
        fi
        ;;
esac
