using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public UsersController(AplicationDbContext context)
        {
            this._context = context;
        }

        //Enviar la lista de Users
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                Thread.Sleep(500);
                var listaUsers = await _context.Users.ToListAsync();
                return Ok(listaUsers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Retornar el usuario con la id que se ha pasado
        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(string userId)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // Eliminar usuario con la id pasada 
        [HttpDelete("{userId}")]
        public async Task<IActionResult> Delete(string userId)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    return NotFound();
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return NoContent();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //Añadir nuevo usuario
/*        [HttpPost]
        public async Task<IActionResult> Post(AppUsers user)
        {
            try
            {
                _context.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction("Get", new { Id = user.Id }, user);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }*/

        [HttpPut("{userId}")]
        public async Task<IActionResult> Put(string userId, AppUsers user)
        {
            try
            {
                if (userId != user.Id)
                {
                    return BadRequest();
                }

                var userItem = await _context.Users.FindAsync(userId);

                if (userItem == null)
                {
                    return NotFound();
                }

                userItem.UserName = user.UserName;

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
