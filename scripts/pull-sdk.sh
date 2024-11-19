#!/bin/bash

# Define the path and repository URL
MODULE_PATH="sub_modules/movie-theater-sdk"
REPO_URL="https://github.com/huynvn97/movie-theater-sdk.git"

# Check if the directory exists
if [ ! -d "$MODULE_PATH" ]; then
  echo "Directory $MODULE_PATH does not exist. Cloning repository..."
  git clone "$REPO_URL" "$MODULE_PATH"

  if [ $? -eq 0 ]; then
    echo "Repository cloned successfully into $MODULE_PATH."
  else
    echo "Failed to clone repository. Please check the URL and your permissions."
    exit 1
  fi
else
  echo "Directory $MODULE_PATH already exists. Skipping clone."
fi


# Navigate to the module directory
cd "$MODULE_PATH" || exit

# Install node modules using yarn
echo "Installing node modules..."
yarn install


if [ $? -eq 0 ]; then
  echo "Node modules installed successfully."
else
  echo "Failed to install node modules. Please check for errors."
  exit 1
fi