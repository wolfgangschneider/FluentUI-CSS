# FluentUI2CSS v2.0 Migration - GitHub Copilot Prompt

Copy the entire prompt below and paste it into **GitHub Copilot Chat** to automatically migrate your code from FluentUI2CSS v1.x to v2.0.

---

## 🤖 COPILOT MIGRATION PROMPT (Copy Everything Below This Line)

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

---

## 🤖 END OF COPILOT PROMPT

---

## Manual Verification After Migration

After Copilot completes the migration, verify the changes:

```bash
# Should find NO results:
grep -r "nav-item" --include="*.razor" --include="*.html"
grep -r "nav-link" --include="*.razor" --include="*.html"
grep -r "verical" --include="*.css"
grep -r "range--smal" --include="*.css"
grep -r "span .radiogroup" --include="*.css"

# Should find results (new classes):
grep -r "nav__item" --include="*.razor" --include="*.html"
grep -r "nav__link" --include="*.razor" --include="*.html"
grep -r "vertical" --include="*.css"
```

---

## Alternative: Use Automated Scripts

If you prefer automated scripts over Copilot:
- **PowerShell**: See `migrate-to-v2.ps1`
- **Node.js**: See `migrate-to-v2.js`  
- **Regex**: See `MIGRATION-REGEX.md`

---

## Need Help?

- 📖 Full Migration Guide: [MIGRATION.md](./MIGRATION.md)
- 💬 Questions: [GitHub Discussions](...)
- 🐛 Issues: [GitHub Issues](...)
