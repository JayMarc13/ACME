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
        public DbSet<City> City { get; set; }
        public DbSet<Office> Office { get; set; }
        public DbSet<MeetingRoom> MeetingRoom { get; set; }
        public DbSet<UserAcme> UserAcme { get; set; }
        public DbSet<Reserve> Reserve { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>()
                .HasOne<Country>()
                .WithMany()
                .HasForeignKey(c => c.CountryId);

            modelBuilder.Entity<Office>()
                .HasOne<City>()
                .WithMany()
                .HasForeignKey(c => c.CityId);

            modelBuilder.Entity<MeetingRoom>()
               .HasOne<Office>()
               .WithMany()
               .HasForeignKey(c => c.OfficeId );

            modelBuilder.Entity<Reserve>()
              .HasOne<MeetingRoom>()
              .WithMany()
              .HasForeignKey(c => c.MeetingRoomId);

            modelBuilder.Entity<UserAcme>()
                .HasKey(u => u.UserId);

            modelBuilder.Entity<Reserve>()
              .HasOne<UserAcme>()
              .WithMany()
              .HasForeignKey(c => c.UserId);


        }
        internal Task UpdateAsync(Country countryItem)
        {
            throw new NotImplementedException();
        }
    }
}
