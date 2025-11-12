#!/bin/bash
# Script to run development server with production environment variables

echo "🚀 Starting development server with PRODUCTION environment..."
echo "API URL: https://api.prod.rojgarapp.in"
echo ""

# Copy production env to development.local which overrides .env.development
cp .env.production .env.development.local

# Start the dev server
react-scripts start

# Clean up on exit
trap 'rm -f .env.development.local' EXIT
