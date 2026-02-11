# FluentUI2CSS v2.0 Migration Script (PowerShell)
# Run from your project root directory

param(
    [string]$Path = ".",
    [switch]$DryRun = $false
)

Write-Host "`n🔄 FluentUI2CSS v2.0 Migration Script`n" -ForegroundColor Cyan

# Define replacements (order matters!)
$replacements = @(
    # Nav classes - typo fix
    @{ Find = 'nav--orientation-verical'; Replace = 'nav--orientation-vertical'; Description = 'Fix nav orientation typo' },
    
    # Nav classes - BEM elements
    @{ Find = 'class="nav-item"'; Replace = 'class="nav__item"'; Description = 'Nav item to BEM element' },
    @{ Find = "class='nav-item'"; Replace = "class='nav__item'"; Description = 'Nav item to BEM element (single quotes)' },
    @{ Find = 'class="nav-link"'; Replace = 'class="nav__link"'; Description = 'Nav link to BEM element' },
    @{ Find = "class='nav-link'"; Replace = "class='nav__link'"; Description = 'Nav link to BEM element (single quotes)' },
    
    # Range classes - typo fix
    @{ Find = 'range--smal'; Replace = 'range--small'; Description = 'Fix range size typo' },
    
    # Range classes - BEM modifiers
    @{ Find = 'range-vertical'; Replace = 'range--vertical'; Description = 'Fix range vertical modifier' },
    
    # CSS selectors
    @{ Find = 'span \.radiogroup'; Replace = '.radiogroup'; Description = 'Fix radiogroup descendant selector'; Regex = $true },
    @{ Find = 'span\.radiogroup'; Replace = '.radiogroup'; Description = 'Make radiogroup element-agnostic'; Regex = $true },
    @{ Find = '\.nav-item([^_])'; Replace = '.nav__item$1'; Description = 'Nav item in CSS'; Regex = $true },
    @{ Find = '\.nav-link([^_])'; Replace = '.nav__link$1'; Description = 'Nav link in CSS'; Regex = $true }
)

$filePatterns = @("*.razor", "*.cshtml", "*.html", "*.jsx", "*.tsx", "*.css", "*.scss")
$totalFiles = 0
$modifiedFiles = 0
$changesByFile = @{}

Write-Host "📂 Scanning files..." -ForegroundColor Yellow

foreach ($pattern in $filePatterns) {
    try {
        $files = Get-ChildItem -Path $Path -Filter $pattern -Recurse -File -ErrorAction SilentlyContinue | 
                 Where-Object { $_.FullName -notmatch '(node_modules|bin|obj|\.git)' }
        
        foreach ($file in $files) {
            $totalFiles++
            $content = Get-Content $file.FullName -Raw -ErrorAction Continue
            if (-not $content) { continue }
            
            $originalContent = $content
            $fileChanges = @()
            
            foreach ($replacement in $replacements) {
                $changed = $false
                
                if ($replacement.Regex) {
                    if ($content -match $replacement.Find) {
                        $content = $content -replace $replacement.Find, $replacement.Replace
                        $changed = $true
                    }
                } else {
                    if ($content.Contains($replacement.Find)) {
                        $content = $content.Replace($replacement.Find, $replacement.Replace)
                        $changed = $true
                    }
                }
                
                if ($changed) {
                    $fileChanges += "  ✓ $($replacement.Description)"
                }
            }
            
            if ($fileChanges.Count -gt 0) {
                $modifiedFiles++
                $relativePath = $file.FullName.Replace((Get-Location).Path, "").TrimStart('\')
                $changesByFile[$relativePath] = $fileChanges
                
                if (-not $DryRun) {
                    Set-Content -Path $file.FullName -Value $content -NoNewline
                }
            }
        }
    } catch {
        Write-Warning "Error processing pattern $pattern : $_"
    }
}

# Display results
Write-Host "`n📊 Migration Summary:" -ForegroundColor Cyan
Write-Host "  Total files scanned: $totalFiles"
Write-Host "  Files modified: $modifiedFiles`n"

if ($modifiedFiles -gt 0) {
    Write-Host "📝 Changes by file:" -ForegroundColor Yellow
    foreach ($file in $changesByFile.Keys | Sort-Object) {
        Write-Host "`n  $file" -ForegroundColor White
        foreach ($change in $changesByFile[$file]) {
            Write-Host $change -ForegroundColor Green
        }
    }
}

if ($DryRun) {
    Write-Host "`nℹ️  This was a DRY RUN. No files were modified." -ForegroundColor Yellow
    Write-Host "   Run without -DryRun flag to apply changes.`n"
} else {
    Write-Host "`n✅ Migration complete!`n" -ForegroundColor Green
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Review the changes in your version control"
    Write-Host "  2. Test your application"
    Write-Host "  3. Commit the changes`n"
}

# Return status
if ($modifiedFiles -eq 0) {
    Write-Host "⚠️  No files needed migration. Already using v2.0?" -ForegroundColor Yellow
}
