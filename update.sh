#!/bin/bash

npm upgrade
cp -r node_modules/jtype-system .
cp -r node_modules/brutestrap tests
echo "Remember to update tests/brutestrap/externals to reflect the local copy of brutal.js" 