using Backend.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        // Configuración de servicios, incluyendo ASP.NET Identity
        services.AddDbContext<AplicationDbContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

        services.AddIdentity<AplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<AplicationDbContext>()
            .AddDefaultTokenProviders();
        services.Configure<IdentityOptions>(options =>
        {
            // Configuración de opciones de contraseña
            options.Password.RequiredLength = 8;
            options.Password.RequireDigit = true;
            options.Password.RequireNonAlphanumeric = true;
            options.Password.RequireUppercase = true;

            // Configuración de opciones de bloqueo de cuenta
            options.Lockout.MaxFailedAccessAttempts = 5;
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, UserManager<AplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        // Configuración del middleware
        app.UseAuthentication();
        app.UseAuthorization();

        // Otros middleware y configuraciones

        // Inicializar la base de datos y crear los roles iniciales si es necesario
        DatabaseInitializer.Initialize(userManager, roleManager).Wait();
    }
}

