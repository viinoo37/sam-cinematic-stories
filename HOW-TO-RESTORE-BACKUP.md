# 🔄 Hoe een Backup Terugzetten

## 📋 Overzicht van Backups

Je kunt alle backups bekijken met:

```bash
git log --oneline --date=format:'%Y-%m-%d %H:%M:%S' --pretty=format:"%h | %ad | %s" -20
```

Of bekijk de backup log:
```bash
cat .git-backup.log
```

## 🔍 Stap 1: Vind de Juiste Versie

### Optie A: Via de Backup Log
De backup log toont nu:
```
[2025-12-11 19:28:06] Backup voltooid | Commit: 0bfed93 | Verwijder punt achter verhalen
```

**Commit hash:** `0bfed93` (de eerste 7 karakters van de volledige commit ID)

### Optie B: Via Git Log
```bash
git log --oneline -20
```

Toont:
```
0bfed93 Verwijder punt achter verhalen
2db0b2c Test backup
c53e45a Test backup
...
```

## 🔄 Stap 2: Terugzetten naar een Specifieke Versie

### Methode 1: Bekijk een Oude Versie (zonder te wijzigen)
```bash
git show 0bfed93:src/components/SamLandingPage.tsx
```

### Methode 2: Herstel een Specifiek Bestand
```bash
# Herstel één bestand naar een oude versie
git checkout 0bfed93 -- src/components/SamLandingPage.tsx
```

### Methode 3: Ga Volledig Terug naar een Oude Versie
```bash
# Maak een nieuwe branch (veilig - je verliest niets)
git checkout -b restore-backup-0bfed93 0bfed93

# Of ga direct terug (LET OP: dit overschrijft je huidige code!)
git reset --hard 0bfed93
```

### Methode 4: Maak een Nieuwe Branch van een Oude Versie
```bash
# Maak een nieuwe branch vanaf een oude commit
git checkout -b test-oude-versie 0bfed93
```

## ⚠️ Belangrijke Commands

### Veilig Terugzetten (aanbevolen)
```bash
# 1. Maak eerst een backup van je huidige werk
git branch backup-voor-restore

# 2. Ga terug naar oude versie
git checkout -b restore-0bfed93 0bfed93

# 3. Als je tevreden bent, merge terug naar main
git checkout main
git merge restore-0bfed93
```

### Ongewenste Wijzigingen Ongedaan Maken
```bash
# Herstel alle wijzigingen sinds laatste commit
git reset --hard HEAD

# Herstel naar specifieke commit
git reset --hard 0bfed93
```

## 📊 Handige Git Commands

```bash
# Bekijk alle commits met details
git log --oneline --graph --all -20

# Zoek commits met specifieke tekst
git log --grep="verhalen" --oneline

# Bekijk wat er veranderd is tussen twee commits
git diff 0bfed93 2db0b2c

# Bekijk een specifiek bestand in een oude versie
git show 0bfed93:src/components/SamLandingPage.tsx
```

## 🎯 Praktisch Voorbeeld

**Scenario:** Je wilt terug naar de versie van "19:15:48"

1. **Vind de commit:**
   ```bash
   git log --oneline --date=format:'%Y-%m-%d %H:%M:%S' --pretty=format:"%h | %ad | %s" | grep "19:15"
   ```
   Resultaat: `c53e45a | 2025-12-11 19:15:47 | Test backup`

2. **Bekijk wat er veranderd is:**
   ```bash
   git show c53e45a
   ```

3. **Herstel (veilig met nieuwe branch):**
   ```bash
   git checkout -b restore-c53e45a c53e45a
   ```

4. **Als je tevreden bent, merge terug:**
   ```bash
   git checkout main
   git merge restore-c53e45a
   ```

## 💡 Tips

- ✅ Gebruik altijd `git checkout -b` om een nieuwe branch te maken (veilig)
- ⚠️ `git reset --hard` overschrijft je code permanent
- 📝 Maak altijd een backup branch voordat je terugzet
- 🔍 Gebruik `git log` om de geschiedenis te bekijken
- 🌐 Alle commits staan ook op GitHub - je kunt ze daar bekijken

## 🔗 GitHub

Je kunt ook op GitHub alle commits bekijken:
- Ga naar: https://github.com/viinoo37/sam-cinematic-stories/commits/main
- Klik op een commit om de details te zien
- Klik op "Browse files" om de volledige versie te zien


