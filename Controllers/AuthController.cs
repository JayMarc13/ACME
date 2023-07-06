using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
                return Ok("Done");
            }
            return BadRequest("Your password or user is wrong!");
        }
    }
}
