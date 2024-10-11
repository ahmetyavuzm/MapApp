using MapApp.Contexts;
using MapApp.Entities;
using MapApp.Interfaces;
using MapApp.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;


//using Microsoft.OpenApi.Models;

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews().AddNewtonsoftJson(options => {
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    options.SerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.Objects;
    options.SerializerSettings.Formatting = Formatting.Indented;
    options.SerializerSettings.Converters.Add(new StringEnumConverter());
});

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IGeometryService, GeometryService>();
builder.Services.AddScoped<IGroupService, GroupService>();

builder.Services.AddDbContext<MapAppDbContext>(options =>
{
    options.UseNpgsql("Server=yavuzdev.postgres.database.azure.com;Database=postgres;Port=5432;User Id=ayavuzm;Password=123Qaz55;Ssl Mode=Require;");
});



builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});

/*
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/build"; // React uygulamanızın build dizini
});
*/

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}



app.UseHttpsRedirection();
app.UseStaticFiles();


/*

// SPA ayarları
app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientApp"; // React uygulamanızın kaynak dosyaları

});

*/





app.UseRouting();


app.UseAuthorization();

app.MapControllers();



app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
    


app.MapFallbackToFile("index.html");


app.Run();
