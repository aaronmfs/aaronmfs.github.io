#!/usr/bin/env bash
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
echo "Serving from: $DIR"
echo "Open http://localhost:8080 in your browser"
echo ""
if command -v python3 &> /dev/null; then
  python3 -m http.server 8080 --directory "$DIR"
elif command -v python &> /dev/null; then
  python -m http.server 8080 --directory "$DIR"
elif command -v npx &> /dev/null; then
  npx serve "$DIR" -p 8080
else
  echo "Error: need python3, python, or npx (node.js)"
  exit 1
fi
