#!/bin/bash
# Script om automatische backups in te stellen voor dit specifieke project
# Gebruik: ./setup-auto-backup.sh

PROJECT_DIR=$(git rev-parse --show-toplevel 2>/dev/null)
if [ -z "$PROJECT_DIR" ]; then
    echo "❌ Fout: Dit is geen Git repository. Initialiseer eerst Git met 'git init'"
    exit 1
fi

PROJECT_NAME=$(basename "$PROJECT_DIR")
HOOKS_DIR="$PROJECT_DIR/.git/hooks"

# Maak hooks directory aan als die niet bestaat
mkdir -p "$HOOKS_DIR"

# Maak post-commit hook aan
cat > "$HOOKS_DIR/post-commit" << 'EOF'
#!/bin/sh
# Automatische backup naar GitHub na elke commit
# Dit script werkt alleen voor dit specifieke project

# Haal project informatie op
PROJECT_DIR=$(git rev-parse --show-toplevel)
PROJECT_NAME=$(basename "$PROJECT_DIR")
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Push naar GitHub (stil, zonder output tenzij er een fout is)
git push origin "$BRANCH" 2>&1 | grep -v "Everything up-to-date" || true

# Log de backup per project
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
echo "[$TIMESTAMP] Backup voltooid voor project: $PROJECT_NAME (branch: $BRANCH)" >> "$PROJECT_DIR/.git-backup.log" 2>/dev/null || true
EOF

# Maak het script uitvoerbaar
chmod +x "$HOOKS_DIR/post-commit"

# Configureer GitHub authenticatie als GitHub CLI beschikbaar is
if command -v gh >/dev/null 2>&1; then
    if gh auth status >/dev/null 2>&1; then
        gh auth setup-git >/dev/null 2>&1
        echo "✅ GitHub authenticatie geconfigureerd"
    else
        echo "⚠️  GitHub CLI niet ingelogd. Run: gh auth login"
    fi
fi

echo ""
echo "✅ Automatische backup geconfigureerd voor project: $PROJECT_NAME"
echo "   Elke keer dat je een commit maakt, wordt deze automatisch naar GitHub gepusht"
echo "   Backup logs worden opgeslagen in: $PROJECT_DIR/.git-backup.log"
echo ""
echo "📝 Test het met: git commit --allow-empty -m 'Test backup'"

