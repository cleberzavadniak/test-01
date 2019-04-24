#!/bin/bash

[[ -d frontend/build/ ]] || bin/frontend-build.sh
exec crossbar start --cbdir crossbar
