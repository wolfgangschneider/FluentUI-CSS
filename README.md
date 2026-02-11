# FluentUI2CSS

Fluent UI styling with BEM methodology for Blazor applications.

## Overview

FluentUI2CSS is a Razor Class Library that provides Fluent UI design system components and styles for Blazor applications, using the BEM (Block Element Modifier) methodology for CSS organization.

## Projects in this Solution

### Production
- **src/FluentUI2CSS** - Main Razor Class Library (NuGet package)
  - Fluent UI components and styles
  - BEM methodology CSS organization
  - Compatible with Blazor Server and WebAssembly

### Tests
- **tests/FluentUI2-CSS-Blazor** - Blazor Server test application
- **tests/FluentUI2-CSS-BlazorWASM** - Blazor WebAssembly test application
- **tests/FluentUI2-CSS-RazorClassLibrary** - Test component library
- **tests/FluentUI2-CSS-Scripts** - JavaScript/TypeScript assets

## Getting Started

### Prerequisites
- .NET SDK 10.0 or later
- Visual Studio 2022 or Rider

### Building the Solution

```bash
dotnet restore
dotnet build
```

### Running Test Applications

**Blazor Server:**
```bash
cd tests/FluentUI2-CSS-Blazor
dotnet run
```

**Blazor WebAssembly:**
```bash
cd tests/FluentUI2-CSS-BlazorWASM
dotnet run
```

## NuGet Package

The main **FluentUI2CSS** package is published to the Easybyte NuGet feed.

### Installing
```bash
dotnet add package FluentUI2CSS
```

### Using in Your Blazor App
Add to your `_Imports.razor`:
```csharp
@using FluentUI2CSS
```

## Migration from v1.x

See migration documentation in the package:
- `MIGRATION.md` - Migration guide (English)
- `NUGET-MIGRATION-GUIDE-DE.md` - Migration guide (German)
- `MIGRATION-COPILOT-PROMPT.md` - AI assistant migration prompts
- `tools/migrate-to-v2.ps1` - PowerShell migration script

## Azure DevOps

### Build Pipeline
The solution uses Azure DevOps for CI/CD:
- Pipeline: `azure-pipelines.yml`
- Organization: https://dev.azure.com/Easybyte/
- Build trigger: Commits to main branch
- NuGet feed: Easybyte internal feed

### Build Status
Check build status in Azure DevOps Pipelines.

## Development

### Project Structure
```
FluentUI2CSS/
├── src/
│   └── FluentUI2CSS/          # Main library
├── tests/
│   ├── FluentUI2-CSS-Blazor/  # Test apps
│   ├── FluentUI2-CSS-BlazorWASM/
│   ├── FluentUI2-CSS-RazorClassLibrary/
│   └── FluentUI2-CSS-Scripts/
└── azure-pipelines.yml
```

### Contributing
1. Clone the repository
2. Create a feature branch
3. Make your changes
4. Test with test applications
5. Submit a pull request

## License

MIT License

## Authors

Easybyte Development Team

## Support

For issues and questions, please use the project's issue tracker in Azure DevOps.
