using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("token")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public string Get() 
        {
            return "Holaaaa";
        }
    }
}
