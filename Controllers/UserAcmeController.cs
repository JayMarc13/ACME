using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAcmeController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public UserAcmeController(AplicationDbContext context)
        {
            this._context = context;
        }

        //Enviar la lista de UserAcme
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                Thread.Sleep(500);
                var listaUserAcme = await _context.UserAcme.ToListAsync();
                return Ok(listaUserAcme);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Retornar la oficina con la id que ha pasado
        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(int userId)
        {
            try
            {
                var userAcme = await _context.UserAcme.FindAsync(userId);
                if (userAcme == null)
                {
                    return NotFound();
                }
                return Ok(userAcme);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // Eliminar oficina con la id pasada 
        [HttpDelete("{userId}")]
        public async Task<IActionResult> Delete(int userId)
        {
            try
            {
                var userAcme = await _context.UserAcme.FindAsync(userId);
                if (userAcme == null)
                {
                    return NotFound();
                }

                _context.UserAcme.Remove(userAcme);
                await _context.SaveChangesAsync();

                return NoContent();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //Añadir nuevo país
        [HttpPost]
        public async Task<IActionResult> Post(UserAcme userAcme)
        {
            try
            {
                _context.Add(userAcme);
                await _context.SaveChangesAsync();

                return CreatedAtAction("Get", new { UserId = userAcme.UserId }, userAcme);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> Put(int userId, UserAcme userAcme)
        {
            try
            {
                if (userId != userAcme.UserId)
                {
                    return BadRequest();
                }

                var userAcmeItem = await _context.UserAcme.FindAsync(userId);

                if (userAcmeItem == null)
                {
                    return NotFound();
                }

                userAcmeItem.UserName = userAcme.UserName;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
