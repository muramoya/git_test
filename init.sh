#!/usr/bin/bash

cd .git/hooks
ln -s ../../git_hooks/post-merge ./

cd ../../
npm install
webpack
