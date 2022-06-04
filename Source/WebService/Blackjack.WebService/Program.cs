using Blackjack.Web.App.Adapters;
using Blackjack.Web.App.Data;
using Blackjack.Web.App.Facades;

WebApplicationBuilder? builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<IUserAdapter, UserAdapter>();
builder.Services.AddScoped<IUserFacade, UserFacade>();
builder.Services.AddDataService(string.Empty);

WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

await app.RunAsync();
