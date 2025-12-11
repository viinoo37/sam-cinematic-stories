# Automatische Backup (20 seconden)

Dit project heeft een **automatische backup** die binnen 20 seconden na elke code wijziging naar GitHub pusht.

## 🚀 Hoe het werkt

1. **Start de backup watcher:**
   ```bash
   npm run auto-backup
   ```

2. **Werk gewoon aan je code** - pas bestanden aan en sla op

3. **Na 20 seconden** wordt automatisch:
   - Alles gecommit
   - Naar GitHub gepusht
   - Gelogd in `.git-backup.log`

## 📝 Gebruik

### Starten
```bash
npm run auto-backup
```

### Stoppen
Druk op `Ctrl+C` in de terminal

## ⚙️ Hoe het werkt

- **Monitort** alle bestandswijzigingen in je project
- **Wacht 20 seconden** na de laatste wijziging
- **Commit automatisch** met bericht: "Auto-backup: [tijdstip]"
- **Push naar GitHub** automatisch
- **Logt** elke backup in `.git-backup.log`

## 🎯 Voordelen

✅ **Geen handmatige commits meer nodig**  
✅ **Automatische backup binnen 20 seconden**  
✅ **Werkt op de achtergrond**  
✅ **Per project geconfigureerd**  

## ⚠️ Let op

- De watcher moet **actief zijn** (in een terminal draaien)
- Wijzigingen worden **gecombineerd** in één commit per 20 seconden
- **Stop de watcher** als je niet aan het werk bent (bespaart resources)

## 🔧 Installatie voor andere projecten

Kopieer `auto-backup-watcher.js` naar je andere project en voeg toe aan `package.json`:
```json
"scripts": {
  "auto-backup": "node auto-backup-watcher.js"
}
```

