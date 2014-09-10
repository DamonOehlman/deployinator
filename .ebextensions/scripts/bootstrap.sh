#!/usr/bin/env bash

# determine the script path
# ref: http://stackoverflow.com/questions/4774054/reliable-way-for-a-bash-script-to-get-the-full-path-to-itself
pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd -P`

# install node dependencies
$NODE_HOME/bin/npm install

# pop path
popd > /dev/null
