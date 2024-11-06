#!/bin/bash

# Loop through all apps and packages
for dir in apps/* libs/* tools/*; do
    if [ -d "$dir" ]; then
        echo "Running eslint migration in $dir"
        (cd "$dir" && rm -f .eslintrc.js .eslintrc.json eslint.config.js eslint.config.mjs .prettierignore .prettierrc .eslintignore)
    fi
done
