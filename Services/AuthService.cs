﻿using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Data.Entity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _config;
        private readonly AplicationDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AuthService(UserManager<IdentityUser> userManager,
            IConfiguration config,
            AplicationDbContext context,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _config = config;
            _context = context;
            _roleManager = roleManager;
        }

        //Verificar el usuario no existe
        public async Task<bool> RegisterUser(LoginUser user)
        {

            var identityUser = new IdentityUser
            {
                UserName = user.UserName,
                Email = user.Email
            };

            var result = await _userManager.CreateAsync(identityUser, user.Password);
            return result.Succeeded;
        }

        //Verificar en la base de datos que el usuario existe
        public async Task<bool> Login(LoginUser user)
        {
            var identityUser = await _userManager.FindByNameAsync(user.UserName);
            var identityEmail = await _userManager.FindByEmailAsync(user.Email);
            if (identityUser is not null || identityEmail is not null)
            {
                return await _userManager.CheckPasswordAsync(identityUser ?? identityEmail, user.Password);
            }

            return false;
        }


        public string GenerateTokenString(LoginUser user)
        {


            var userToken = _context.Users.FirstOrDefault(u => u.UserName == user.UserName);

            var claims = new List<Claim> { };

            if (userToken != null)

            {
                var roleUser = _context.UserRoles.FirstOrDefault(x => x.UserId == userToken.Id);

                if (roleUser != null)
                {
                    claims = new List<Claim>
                        {
                         new Claim(ClaimTypes.Email, user.UserName),
                         new Claim(ClaimTypes.Role, "Administrador")
                        };
                }
                else
                {
                    claims = new List<Claim>
                        {
                        new Claim(ClaimTypes.Email, user.UserName),
                        new Claim(ClaimTypes.Role, "User")
                        };
                }
            }
            else
            {
                Console.WriteLine(userToken + "Hola");
            }





            SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value));
            SigningCredentials signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);
            var securityToken = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(1), //Caducación
                issuer: _config.GetSection("Jwt:Issuer").Value,
                audience: _config.GetSection("Jwt:Audience").Value,
                signingCredentials: signingCred);

            string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);

            return tokenString;
        }
        //cambio de contraseña
        public async Task<bool> ChangePassword(LoginUser user, ChangePassword model)
        {
            var identityUser = await _userManager.FindByNameAsync(user.UserName);
            var identityEmail = await _userManager.FindByEmailAsync(user.Email);

            if (identityUser is not null || identityEmail is not null)
            {
                // Verificar que la contraseña actual sea válida
                var passwordValid = await _userManager.CheckPasswordAsync(identityUser ?? identityEmail, user.Password);

                if (passwordValid)
                {
                    // Cambiar la contraseña
                    var result = await _userManager.ChangePasswordAsync(identityUser ?? identityEmail, user.Password, model.NuevaContraseña);
                    return result.Succeeded;
                }
            }

            return false;
        }

        public async Task<bool> addRolAdm(String userId)
        {
            var identityUser = await _userManager.FindByIdAsync(userId);
            //var identityUser = await _userManager.FindByNameAsync(userName);
            if (identityUser != null)
            {
                var rol = "Administrador";
                var isInRole = await _userManager.IsInRoleAsync(identityUser, rol);

                if (!isInRole)
                {
                    await _userManager.AddToRoleAsync(identityUser, rol);
                    return true;
                }
            }
            return false;
        }

       


    }
}
