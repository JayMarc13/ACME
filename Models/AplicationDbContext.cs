using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    //Crear la base de datos
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options): base(options) 
        { 
        
        }

        public DbSet<Country> Country { get; set; } //Nombre de la tabla

        internal Task UpdateAsync(Country countryItem)
        {
            throw new NotImplementedException();
        }
    }
}
