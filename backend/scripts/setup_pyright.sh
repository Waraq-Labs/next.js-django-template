#! /usr/bin/env bash

SCRIPT_DIR=$(cd $(dirname $0); pwd)
cd $SCRIPT_DIR/../

VENV_PATH=$(poetry env info -p)
VENV_DIR=$(dirname $VENV_PATH)
VENV_NAME=$(basename $VENV_PATH)

cat > ../pyrightconfig.json <<EOF
{
  "venvPath": "$VENV_DIR",
  "venv": "$VENV_NAME"
}
EOF
