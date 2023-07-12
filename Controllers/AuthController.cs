using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService autchService) 
        { 
            _authService = autchService;
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
    }
}
