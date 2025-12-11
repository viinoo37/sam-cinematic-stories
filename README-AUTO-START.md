# 🚀 Automatische Backup - Auto Start

De automatische backup start nu **automatisch** wanneer je dit project opent in Cursor!

## ✅ Wat is er ingesteld:

1. **VSCode/Cursor Task** - Start automatisch bij het openen van het project
2. **Automatische detectie** - Monitort alle bestandswijzigingen
3. **20 seconden delay** - Backup na 20 seconden inactiviteit
4. **Automatische push** - Direct naar GitHub

## 🎯 Hoe het werkt:

1. **Open dit project in Cursor**
2. **Cursor vraagt automatisch** of je de backup task wilt starten
3. **Klik "Allow"** of "Always Allow"
4. **Klaar!** - Elke wijziging wordt automatisch gebackupt

## 📝 Eerste keer:

Bij het eerste openen van het project:
- Cursor vraagt: "Do you want to allow automatic tasks?"
- Klik **"Allow"** of **"Always Allow"**
- De backup start automatisch

## ⚙️ Handmatig starten (als het niet automatisch start):

1. Druk op `⌘⇧P` (Mac) of `Ctrl+Shift+P` (Windows/Linux)
2. Type: `Tasks: Run Task`
3. Selecteer: `🚀 Start Auto Backup`

## 🛑 Stoppen:

- Druk op `⌘⇧P` → `Tasks: Terminate Task` → Selecteer "Auto Backup"
- Of sluit de terminal waar het draait

## ✅ Controleren of het werkt:

1. Pas een bestand aan en sla op
2. Je ziet in de terminal: `📝 Wijziging gedetecteerd`
3. Na 20 seconden: `✅ Backup voltooid en naar GitHub gepusht!`
4. Check GitHub - je wijziging staat er!

## 💡 Tips:

- De backup draait op de achtergrond
- Je ziet meldingen in de terminal
- Alle backups worden gelogd in `.git-backup.log`
- Stop de backup als je niet aan het werk bent (bespaart resources)


