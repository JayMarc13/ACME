using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Session;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

//Conexión a la base de datos
builder.Services.AddDbContext<AplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetSection("ConnectionStrings:DefaultConnection").Value);
});


builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Establece el tiempo de expiración de la sesión
});




//Configuración del identity
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    // Configuración del password
}).AddEntityFrameworkStores<AplicationDbContext>()
    .AddRoles<IdentityRole>()
    .AddRoleManager<RoleManager<IdentityRole>>()
    .AddDefaultTokenProviders();

builder.Services.AddTransient<IAuthService, AuthService>();

builder.Services.AddIdentityCore<IdentityUser>()
    .AddUserManager<UserManager<IdentityUser>>();


//Configuración del token
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme=JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
     options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateActor = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        RequireExpirationTime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration.GetSection("Jwt:Issuer").Value,
        ValidAudience = builder.Configuration.GetSection("Jwt:Audience").Value,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Jwt:Key").Value))
    };
});

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Cors
builder.Services.AddCors(options => options.AddPolicy("AllowWebapp",
                                    builder => builder.AllowAnyOrigin()
                                                    .AllowAnyHeader()
                                                    .AllowAnyMethod()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowWebapp");

app.UseHttpsRedirection();

app.UseSession();

app.UseAuthorization();

app.MapControllers();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

    var Name = "Administrador";
    // comprueba si existe
    if (!await roleManager.RoleExistsAsync(Name))
    {
        var role = new IdentityRole(Name);
        await roleManager.CreateAsync(role);
    }

    //correo de administrador super adm
    var usuario = await userManager.FindByEmailAsync("adm@acme.com");


    if (usuario != null)
    {
       var isInRole = await userManager.IsInRoleAsync(usuario, Name);

       if (!isInRole)
       {
          await userManager.AddToRoleAsync(usuario, Name);
       }
    }
}



app.Run();
