#!/bin/bash
# Script to run development server with development environment variables

echo "🔧 Starting development server with DEVELOPMENT environment..."
echo "API URL: https://api.dev.rojgarapp.in"
echo ""

# Remove any local override
rm -f .env.development.local

# Start the dev server
react-scripts start
