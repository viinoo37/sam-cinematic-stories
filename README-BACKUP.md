# Automatische Backups per Project

Dit project heeft automatische backups geconfigureerd die **alleen voor dit project** werken.

## Hoe het werkt

- Elke keer dat je een `git commit` maakt, wordt de code automatisch naar GitHub gepusht
- Elk project heeft zijn eigen backup configuratie
- Projecten lopen niet door elkaar - elk project is onafhankelijk

## Setup voor andere projecten

Als je automatische backups wilt instellen voor een ander project:

1. Ga naar het project directory
2. Zorg dat Git is geïnitialiseerd: `git init`
3. Kopieer `setup-auto-backup.sh` naar dat project
4. Run: `./setup-auto-backup.sh`

Of maak handmatig een `.git/hooks/post-commit` bestand aan in elk project.

## Backup logs

Backup logs worden opgeslagen in `.git-backup.log` in de root van elk project.

## Controleren of het werkt

Maak een test commit:
```bash
git commit --allow-empty -m "Test backup"
```

De commit wordt automatisch naar GitHub gepusht!

