#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR/../

OLD_NAME="backend"

if [ -z "$1" ]; then
    echo "Please provide a new name for the project"
    exit 1
fi

NEW_NAME=$1

# Check that the new name is a valid Python package name
if ! echo $NEW_NAME | grep -qE "^[a-zA-Z_][a-zA-Z0-9_]*$"; then
    echo "The new name is not a valid Python package name"
    exit 1
fi

sed -i .bak "s/name = \"backend\"/name = \"$NEW_NAME\"/" pyproject.toml
sed -i .bak "s/$OLD_NAME.main.settings/$NEW_NAME.main.settings/" backend/manage.py
sed -i .bak "s/$OLD_NAME.main.settings/$NEW_NAME.main.settings/" backend/main/asgi.py
sed -i .bak "s/$OLD_NAME.main.settings/$NEW_NAME.main.settings/" backend/main/wsgi.py
sed -i .bak "s/$OLD_NAME.main.urls/$NEW_NAME.main.urls/" backend/main/settings.py
sed -i .bak "s/$OLD_NAME.main.wsgi.application/$NEW_NAME.main.wsgi.application/" backend/main/settings.py

mv $OLD_NAME $NEW_NAME
