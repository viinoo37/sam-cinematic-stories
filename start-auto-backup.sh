#!/bin/bash
# Automatisch start script voor auto-backup
# Dit script start automatisch de backup watcher

cd "$(dirname "$0")"

# Check of fswatch geïnstalleerd is
if ! command -v fswatch &> /dev/null; then
    echo "⚠️  fswatch niet gevonden. Installeer met: brew install fswatch"
    exit 1
fi

# Check of we in een Git repo zijn
if [ ! -d ".git" ]; then
    echo "⚠️  Dit is geen Git repository"
    exit 1
fi

# Start de backup watcher in de achtergrond
echo "🚀 Automatische backup gestart..."
npm run auto-backup


