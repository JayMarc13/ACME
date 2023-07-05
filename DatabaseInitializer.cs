using Backend.Models;
using Microsoft.AspNetCore.Identity;



namespace Backend;
public static class DatabaseInitializer
{
    public static async Task Initialize(UserManager<UserAcme> userManager, RoleManager<IdentityRole> roleManager)
    {
        // Crear roles iniciales si no existen
        string[] roles = { "Admin", "User" };
        foreach (var role in roles)
        {
            bool roleExists = await roleManager.RoleExistsAsync(role);
            if (!roleExists)
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }



        // Crear un usuario administrador si no existe
        var adminUser = await userManager.FindByEmailAsync("admin@example.com");
        if (adminUser == null)
        {
            var newAdminUser = new UserAcme
            {
                UserName = "admin@example.com",
                UserEmail = "admin@example.com"
                // Otras propiedades del usuario, si las tienes
            };



            await userManager.CreateAsync(newAdminUser, "Password123!"); // Establece la contraseña adecuada



            // Asignar el rol de administrador al usuario
            await userManager.AddToRoleAsync(newAdminUser, "Admin");
        }
    }
}