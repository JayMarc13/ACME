using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;



namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserManager<UserAcme> _userManager;
        private readonly SignInManager<UserAcme> _signInManager;

        public LoginController(UserManager<UserAcme> userManager, SignInManager<UserAcme> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var user = new UserAcme { UserName = model.Email, Email = model.Email };



            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok();
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, isPersistent: false, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }



        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}