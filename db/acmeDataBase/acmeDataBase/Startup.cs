using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using acmeDataBase.Models; // Asegúrate de importar tus modelos aquí


namespace acmeDataBase
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Configura Entity Framework Core con SQL Server
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));

            // Registra otros servicios y configuraciones aquí
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // Configura el manejo de errores en otros entornos (producción, etc.)
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            // Configura otros middleware y rutas aquí...

            // Finalmente, asegúrate de que haya una llamada a UseRouting() y UseEndpoints() si estás usando enrutamiento.
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
