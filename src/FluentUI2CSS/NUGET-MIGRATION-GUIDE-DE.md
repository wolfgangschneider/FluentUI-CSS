# FluentUI2CSS v2.0 Migration - Anleitung für NuGet-Nutzer

## Übersicht

Die Migration-Dateien werden **automatisch mit dem NuGet-Package** ausgeliefert und befinden sich nach der Installation in Ihrem Projekt.

---

## Schritt-für-Schritt Anleitung

### 1. NuGet-Package aktualisieren

```bash
# In Package Manager Console
Update-Package FluentUI2CSS -Version 2.0.0

# Oder in .NET CLI
dotnet add package FluentUI2CSS --version 2.0.0
```

### 2. Migration-Dateien finden

Nach der Installation finden Sie die Dateien hier:

**Lokaler NuGet Cache:**
```
C:\Users\<YourUser>\.nuget\packages\fluentui2css\2.0.0\
```

**Im Projektordner (wenn Package Reference):**
```
YourProject\obj\project.assets.json (Referenz)
```

---

## ⚡ Schnellste Methode: GitHub Copilot

### Option 1: Von GitHub laden (Empfohlen)

**Sie müssen KEINE Dateien kopieren!**

1. Öffnen Sie **GitHub Copilot Chat** in Visual Studio/VS Code/Rider
2. Kopieren Sie den kompletten Text aus dieser Datei:
   - **Von GitHub:** https://github.com/yourorg/FluentUI2CSS/blob/main/MIGRATION-COPILOT-PROMPT.md
   - **Oder von unten** (siehe "Copilot Prompt zum Kopieren")
3. Fügen Sie den Text in Copilot Chat ein
4. Bestätigen Sie die Änderungen

**Zeit:** ~5 Minuten ⚡

---

### Option 2: Von NuGet-Package nutzen

**Datei aus Package extrahieren:**

1. Gehen Sie zu Ihrem NuGet Cache:
   ```powershell
   # Öffnen Sie PowerShell
   cd $env:USERPROFILE\.nuget\packages\fluentui2css\2.0.0
   explorer .
   ```

2. Kopieren Sie die Datei:
   ```
   MIGRATION-COPILOT-PROMPT.md
   ```
   
3. Öffnen Sie die Datei in einem Texteditor
4. Kopieren Sie den **Copilot Prompt** Abschnitt
5. Fügen Sie ihn in GitHub Copilot Chat ein

---

## 📋 Copilot Prompt zum Kopieren

**Kopieren Sie alles zwischen den Linien und fügen Sie es in Copilot Chat ein:**

```
────────────────────────────────────────────────────────────────
I need to migrate my codebase from FluentUI2CSS v1.x to v2.0. The library has adopted proper BEM naming conventions. Please update all class names following these rules:

### Navigation Component Classes
1. Replace `class="nav-item"` with `class="nav__item"`
2. Replace `class="nav-link"` with `class="nav__link"`  
3. Replace `class="active"` **on nav items only** with `class="nav__item--is-active"`
4. Fix typo: `class="nav--orientation-verical"` → `class="nav--orientation-vertical"`
5. For nav containers with only the orientation modifier, add base class: `<nav class="nav--orientation-vertical">` → `<nav class="nav nav--orientation-vertical">`

### Tablist Component Classes
6. Add class to tablist labels: `<label>` inside `.tablist` → `<label class="tablist__tab">`
7. Add class to tablist inputs: `<input type="radio">` inside `.tablist` → `<input type="radio" class="tablist__input">`

### Range Input Classes  
8. Fix typo: `class="range--smal"` → `class="range--small"`
9. Fix modifier: `class="range-vertical"` → `class="range--vertical"`
10. Split double modifiers: `class="range-vertical--small"` → `class="range--vertical range--small"` (two separate classes)

### Radiogroup Component Classes
11. Make element-agnostic: `<span class="radiogroup">` → `<div class="radiogroup">` (or keep span, just remove requirement)
12. Fix nested class: `class="radiogroup radiogroup--orientation-vertical"` → `class="radiogroup--orientation-vertical"` (single class, not nested)

### CSS Selector Updates (in .css/.scss files)
13. Replace `.nav-item` selectors → `.nav__item`
14. Replace `.nav-link` selectors → `.nav__link`  
15. Replace `span .radiogroup` → `.radiogroup` (remove space - it's a descendant selector bug)
16. Replace `span.radiogroup` → `.radiogroup` (make element-agnostic)

### File Types to Search
- `**/*.razor`
- `**/*.cshtml`
- `**/*.html`
- `**/*.jsx`
- `**/*.tsx`
- `**/*.css`
- `**/*.scss`

### Important Rules
- **Preserve all other attributes** (id, data-*, @onclick, @bind, etc.)
- **Keep proper indentation** and formatting
- **Don't modify unchanged classes**: button, label, input, checkbox, radio, select classes remain the same
- **Be careful with .active**: Only change it on nav items, not other components
- **Show me a summary** of all changes before applying them

Please analyze all matching files and show me:
1. Total files affected
2. Summary of changes per file
3. Ask for confirmation before applying

Then proceed with the migration if I confirm.
────────────────────────────────────────────────────────────────
```

---

## 🔧 Alternative: PowerShell Script

### Aus NuGet-Package:

```powershell
# 1. Navigieren Sie zu Ihrem NuGet Cache
cd $env:USERPROFILE\.nuget\packages\fluentui2css\2.0.0

# 2. Kopieren Sie das Script in Ihr Projekt
Copy-Item "migrate-to-v2.ps1" "C:\Ihr\Projekt\Pfad\"

# 3. Wechseln Sie zu Ihrem Projekt
cd "C:\Ihr\Projekt\Pfad"

# 4. Vorschau (Dry Run)
.\migrate-to-v2.ps1 -DryRun

# 5. Migration ausführen
.\migrate-to-v2.ps1
```

---

## 📁 Welche Dateien sind im NuGet-Package enthalten?

Nach der Installation von v2.0.0 enthält das Package:

```
fluentui2css.2.0.0\
├── content\                          (Optional - für Content Files)
├── contentFiles\                     (Optional - für .NET Core)
├── lib\                              
│   └── net6.0\                       (oder net7.0, net8.0)
│       └── FluentUI2CSS.dll
├── staticwebassets\                  (CSS Dateien)
│   └── css\
│       ├── fluentui2css-*.css        (alle CSS Dateien)
├── MIGRATION-COPILOT-PROMPT.md       ← Diese Datei!
├── MIGRATION.md                      ← Vollständige Anleitung
├── migrate-to-v2.ps1                 ← PowerShell Script
├── README.md
└── CHANGELOG.md
```

---

## ❓ Häufige Fragen

### Muss ich die Dateien manuell kopieren?

**Nein!** Sie haben zwei Optionen:

1. **GitHub (Empfohlen):** Kopieren Sie den Prompt direkt von GitHub oder aus dieser Anleitung
2. **NuGet Cache:** Öffnen Sie die Datei aus dem NuGet Cache Ordner

### Welche Datei muss ich in Copilot laden?

Sie müssen **keine Datei laden**! Kopieren Sie einfach den Prompt-Text (siehe oben "Copilot Prompt zum Kopieren") und fügen Sie ihn in Copilot Chat ein.

### Was ist, wenn ich keinen Zugriff auf GitHub habe?

Nutzen Sie den "Copilot Prompt zum Kopieren" aus dieser Anleitung - er enthält den kompletten Prompt.

### Kann ich die Migration-Dateien in mein Projekt kopieren?

Ja, optional:

```powershell
# Kopieren Sie die Dateien für lokalen Zugriff
$nugetPath = "$env:USERPROFILE\.nuget\packages\fluentui2css\2.0.0"
Copy-Item "$nugetPath\MIGRATION*.md" ".\docs\"
Copy-Item "$nugetPath\migrate-to-v2.ps1" ".\"
```

---

## 🎯 Empfohlener Workflow

### Für Visual Studio / Rider:

1. **Öffnen Sie Ihr Projekt**
2. **Öffnen Sie GitHub Copilot Chat**
   - Visual Studio: Tools → GitHub Copilot Chat
   - Rider: Tools → Copilot → Open Chat
3. **Kopieren Sie den Prompt** (von oben oder aus `MIGRATION-COPILOT-PROMPT.md`)
4. **Fügen Sie ein** in Copilot Chat
5. **Review** der vorgeschlagenen Änderungen
6. **Bestätigen** Sie die Änderungen
7. **Testen** Sie Ihre Anwendung
8. **Commit** der Änderungen

**Fertig!** ✅

### Für VS Code:

1. **Öffnen Sie Ihr Projekt**
2. **Öffnen Sie Copilot Chat:** `Ctrl+Shift+I` (Windows) oder `Cmd+Shift+I` (Mac)
3. **Folgen Sie den Schritten 3-8** von oben

---

## 📞 Support

Bei Problemen:

1. **Vollständige Anleitung:** Öffnen Sie `MIGRATION.md` aus dem NuGet-Package
2. **GitHub Issues:** https://github.com/yourorg/FluentUI2CSS/issues
3. **Discussions:** https://github.com/yourorg/FluentUI2CSS/discussions

---

## ✅ Checkliste nach Migration

- [ ] Alle `.razor` Dateien überprüft
- [ ] Alle `.cshtml` Dateien überprüft
- [ ] Custom CSS Dateien überprüft
- [ ] Anwendung getestet
- [ ] Browser Cache geleert
- [ ] Build erfolgreich
- [ ] Änderungen commitet

---

## 🔄 Zurück zu v1.x (Rollback)

Falls erforderlich:

```xml
<!-- In .csproj -->
<PackageReference Include="FluentUI2CSS" Version="1.*" />
```

Oder:

```powershell
Update-Package FluentUI2CSS -Version 1.5.0
```
