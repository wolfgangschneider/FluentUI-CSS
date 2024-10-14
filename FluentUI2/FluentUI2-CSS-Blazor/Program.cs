using FluentUI2_CSS_Blazor;
using FluentUI2_CSS_Blazor.Components;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    
    .AddInteractiveServerComponents();
//builder.Services.AddCascadingValue(sp => new GlobalRenderMode() );
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();


app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddAdditionalAssemblies(typeof(FluentUI2_CSS_RazorClassLibrary.Components.Layout.NavMenu).Assembly)
    .AddInteractiveServerRenderMode();

app.Run();
