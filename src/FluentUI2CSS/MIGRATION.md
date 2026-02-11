# Migration Guide: FluentUI2CSS v1.x → v2.0

## Overview

FluentUI2CSS v2.0 adopts proper BEM (Block Element Modifier) naming conventions for better code clarity and maintainability.

⚠️ **This is a breaking change.** Class names have been updated and you must migrate your code to use v2.0.

---

## Quick Migration (Choose Your Method)

### Method 1: GitHub Copilot ⭐ RECOMMENDED

**Time:** ~5 minutes for most projects

1. Open **GitHub Copilot Chat** in your IDE (VS Code, Visual Studio, Rider, etc.)
2. Copy the complete prompt from [`MIGRATION-COPILOT-PROMPT.md`](./MIGRATION-COPILOT-PROMPT.md)
3. Paste it into Copilot Chat
4. Review the summary of changes
5. Confirm and let Copilot apply the changes

**Why Copilot?** It understands context, preserves formatting, and handles edge cases automatically.

---

### Method 2: PowerShell Script

**Time:** ~2 minutes  
**Platform:** Windows, macOS, Linux (PowerShell Core)

```powershell
# Navigate to your project root
cd C:\YourProject

# Download the script (or use local copy from FluentUI2CSS package)
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/yourorg/FluentUI2CSS/main/migrate-to-v2.ps1" -OutFile "migrate.ps1"

# Preview changes (dry run)
.\migrate.ps1 -DryRun

# Apply changes
.\migrate.ps1
```

---

### Method 3: Manual Find & Replace

**Time:** ~10-15 minutes  
**Platform:** Any editor with regex support

See detailed patterns in the [Changes Reference](#changes-reference) section below.

---

## Breaking Changes

### Navigation Component

| v1.x (Old) | v2.0 (New) | Change Type |
|------------|------------|-------------|
| `.nav-item` | `.nav__item` | BEM element |
| `.nav-link` | `.nav__link` | BEM element |
| `.active` (on nav) | `.nav__item--is-active` | BEM state modifier |
| `.nav--orientation-verical` | `.nav--orientation-vertical` | Typo fix |
| (none) | `.nav` | Base class added |

**Example:**
```html
<!-- OLD (v1.x) -->
<nav class="nav--orientation-vertical">
  <div class="nav-item active">
    <a class="nav-link" href="/">Home</a>
  </div>
</nav>

<!-- NEW (v2.0) -->
<nav class="nav nav--orientation-vertical">
  <div class="nav__item nav__item--is-active">
    <a class="nav__link" href="/">Home</a>
  </div>
</nav>
```

---

### Tablist Component

| v1.x (Old) | v2.0 (New) | Change Type |
|------------|------------|-------------|
| `.tablist label` (selector) | `.tablist__tab` | BEM element class |
| `.tablist input` (selector) | `.tablist__input` | BEM element class |

**Example:**
```html
<!-- OLD (v1.x) -->
<div class="tablist">
  <label>
    <input type="radio" name="tab" />
    Tab 1
  </label>
</div>

<!-- NEW (v2.0) -->
<div class="tablist">
  <label class="tablist__tab">
    <input type="radio" name="tab" class="tablist__input" />
    Tab 1
  </label>
</div>
```

---

### Range Input Component

| v1.x (Old) | v2.0 (New) | Change Type |
|------------|------------|-------------|
| `.range--smal` | `.range--small` | Typo fix |
| `.range-vertical` | `.range--vertical` | BEM modifier fix |
| `.range-vertical--small` | `.range--vertical .range--small` | Split modifiers |

**Example:**
```html
<!-- OLD (v1.x) -->
<input type="range" class="range--smal" />
<input type="range" class="range-vertical" />

<!-- NEW (v2.0) -->
<input type="range" class="range--small" />
<input type="range" class="range--vertical" />
```

---

### Radiogroup Component

| v1.x (Old) | v2.0 (New) | Change Type |
|------------|------------|-------------|
| `span.radiogroup` | `.radiogroup` | Element-agnostic |
| `span .radiogroup` (space) | `.radiogroup` | Selector bug fix |

**Example:**
```html
<!-- OLD (v1.x) -->
<span class="radiogroup">
  <input type="radio" />
  <label>Option 1</label>
</span>

<!-- NEW (v2.0) - can use any element -->
<div class="radiogroup">
  <input type="radio" class="radiogroup__input" />
  <label class="radiogroup__label">Option 1</label>
</div>
```

---

## Unchanged Components ✅

These components have **NO breaking changes**:

- **Button**: All classes remain the same
  - `button`, `.button--appearance-*`, `.button--size-*`, `.button--shape-*`
  
- **Label**: All classes remain the same
  - `label`, `.label--size-*`, `.label--weight-*`, `.label--position-*`
  
- **Input Components**: All classes remain the same
  - `input[type="checkbox"]`, `input[type="radio"]`, `input[type="text"]`, etc.
  - All modifier classes unchanged

---

## Changes Reference

### For VS Code / Rider (Regex Find & Replace)

Press `Ctrl+Shift+H` (Windows) or `Cmd+Shift+H` (Mac), enable regex mode (`.*`), and set file filter: `**/*.{razor,cshtml,html,css,scss}`

#### Pattern 1: Nav Item
```regex
Find:    class="([^"]*\s)?nav-item(\s[^"]*)?"\
Replace: class="$1nav__item$2"
```

#### Pattern 2: Nav Link
```regex
Find:    class="([^"]*\s)?nav-link(\s[^"]*)?"\
Replace: class="$1nav__link$2"
```

#### Pattern 3: Fix Typo - Verical
```regex
Find:    nav--orientation-verical
Replace: nav--orientation-vertical
```

#### Pattern 4: Fix Typo - Smal
```regex
Find:    range--smal
Replace: range--small
```

#### Pattern 5: Range Vertical
```regex
Find:    range-vertical
Replace: range--vertical
```

#### Pattern 6: Radiogroup Selector (CSS files only)
```regex
Find:    span\s+\.radiogroup
Replace: .radiogroup
```

---

## Verification

After migration, run these commands to verify:

### Should Find NO Results (old classes removed):
```bash
grep -r "nav-item" --include="*.razor" --include="*.html" --include="*.cshtml"
grep -r "nav-link" --include="*.razor" --include="*.html"
grep -r "verical" --include="*.css"
grep -r "range--smal" --include="*.css"
grep -r "span .radiogroup" --include="*.css"
```

### Should Find Results (new classes present):
```bash
grep -r "nav__item" --include="*.razor" --include="*.html"
grep -r "nav__link" --include="*.razor" --include="*.html"
grep -r "vertical" --include="*.css"
```

---

## Rollback Instructions

If you need to revert to v1.x:

### NuGet Package:
```xml
<PackageReference Include="FluentUI2CSS" Version="1.*" />
```

### NPM Package:
```bash
npm install fluentui2css@1.x
```

### Manual Revert:
Use version control to revert changes:
```bash
git checkout HEAD -- **/*.razor **/*.html **/*.css
```

---

## Common Issues

### Issue: `.active` class changed everywhere
**Solution:** Only change `.active` on nav items, not other components. Use Copilot method for context-aware replacement.

### Issue: Build errors after migration
**Solution:** Ensure all CSS files are updated. Check for custom CSS that references old class names.

### Issue: Styles not applying
**Solution:** Clear browser cache and rebuild project. Verify CSS bundle includes v2.0 files.

---

## Need Help?

- 📖 **BEM Analysis**: See session files for detailed BEM breakdown
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourorg/FluentUI2CSS/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourorg/FluentUI2CSS/issues)
- 📧 **Email**: support@yourorg.com

---

## Contributing

Found an issue with the migration? Please:
1. Check existing issues
2. Create a new issue with:
   - Your migration method used
   - Expected vs actual result
   - Code samples

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for complete v2.0 changes.
