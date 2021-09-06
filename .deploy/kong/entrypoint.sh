#!/bin/sh -l
set -e -o pipefail

main (){
    cmd=$1
    dir=$2
    ops=$3
    if [ ! -e ${dir} ]; then
        echo "${dir}: No such file or directory exists";
        exit 1;
    fi

    for file in $(ls ${dir}); do
        echo "Executing: deck $cmd $ops -s $dir/$file"
        deck $cmd $ops -s $dir/$file
    done
}

case $1 in
    "ping") deck $1 $3;;
    "validate"|"diff"|"sync") main $1 $2 "$3" ;;
    * ) echo "deck $1 is not supported." && exit 1 ;;
esac
