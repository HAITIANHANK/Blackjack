using Blackjack.Web.App.Adapters;
using Blackjack.Web.App.Data;
using Blackjack.Web.App.Facades;
using Blackjack.Web.App.Facades.Translators;
using Blackjack.Web.App.Infrastructure;
using ConnStrings = Blackjack.Web.App.Infrastructure.SystemConstants.AppSettings.ConnStrings;
using Blackjack.Web.App.WebService.Controllers.Translators;
using Blackjack.Web.App.WebService.Middleware;

WebApplicationBuilder? builder = WebApplication.CreateBuilder(args);
IConfiguration Configuration = new ConfigurationBuilder()
                .SetBasePath(builder.Environment.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false)
                .AddEnvironmentVariables()
                .Build();

// Add services to the container.

builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserAdapter, UserAdapter>();
builder.Services.AddScoped<IUserFacade, UserFacade>();
builder.Services.AddDataService(Configuration.GetConnectionString(ConnStrings.BlackjackDB));
builder.Services.AddAutoMapper(typeof(Entity_BusinessEntity), typeof(BusinessEntity_BusinessModel));

WebApplication app = builder.Build();
app.MapWhen(
    // When request path is /status/isalive.
    path => path.Request.Path.Value?.ToLower() == "/status/isalive",
    // Return this message.
    builder => builder.Run(async context =>
        await context.Response.WriteAsync("Web server is currently running."))
);
app.UseExceptionHandlerMiddleware();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

await app.RunAsync();
