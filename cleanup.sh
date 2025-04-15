#!/bin/bash
# Cleanup script to ensure a fresh start

# Kill any running Node.js processes
echo "Killing any running Node.js processes..."
killall node 2>/dev/null || true

# Remove Next.js build cache
echo "Removing Next.js build cache..."
rm -rf .next

# Clear browser storage (you'll need to run this manually)
echo "Please clear your browser's cache and cookies for localhost"
echo "In Chrome: Open Dev Tools > Application > Clear Storage > Clear site data"

# Start fresh
echo "Starting development server..."
npm run dev 