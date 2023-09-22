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
        [HttpPost("ChangePassword")]
        // Asegura que solo usuarios autenticados puedan cambiar su contraseña
        public async Task<IActionResult> ChangePassword(ChangePasswordRequest request)
        {
            if (ModelState.IsValid)
            {
                // Llama al servicio para cambiar la contraseña
                var result = await _authService.ChangePassword(request.User, request.ChangePassword);

                if (result)
                {
                    return Ok(new { message = "Contraseña cambiada con éxito" });
                }
                else
                {
                    return BadRequest(new { message = "No se pudo cambiar la contraseña. Verifique la contraseña actual y asegúrese de que la nueva contraseña cumpla con los requisitos." });
                }
            }

            return BadRequest(new { message = "Los datos proporcionados son inválidos." });
        }




    }
}
