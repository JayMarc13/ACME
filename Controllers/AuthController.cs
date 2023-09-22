using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly UserManager<IdentityUser> _userManager;

        public AuthController(IAuthService autchService, UserManager<IdentityUser> userManager) 
        { 
            _authService = autchService;
            _userManager = userManager;
        }
        
        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser(LoginUser user) 
        {
            if (await _authService.RegisterUser(user)) 
            {
                return Ok("Successfuly done");
            }
            return BadRequest("Algo no funciona!");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginUser user) 
        {
            if (!ModelState.IsValid) 
            { 
                return BadRequest();
            }

            if (await _authService.Login(user))
            {
                var tokenString = _authService.GenerateTokenString(user);

                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadJwtToken(tokenString);
                return Ok(new { token = tokenString });
                
            }
            return Unauthorized();
        }
        [HttpPut("CambiarContraseña")]
        [Authorize] // Requiere autenticación
        public async Task<IActionResult> CambiarContraseña(ChangePassword model)
        {
            var usuario = await _userManager.FindByNameAsync(User.Identity.Name);

            Console.Write(usuario.ToString());

            if (usuario == null)
            {
                return NotFound("Usuario no encontrado");
            }

            var resultado = await _userManager.ChangePasswordAsync(usuario, model.ContraseñaActual, model.NuevaContraseña);

            if (resultado.Succeeded)
            {
                return Ok("Contraseña cambiada exitosamente");
            }
            else
            {
                return BadRequest("No se pudo cambiar la contraseña");
            }
        }



    }
}
