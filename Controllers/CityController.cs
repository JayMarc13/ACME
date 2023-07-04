using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public CityController(AplicationDbContext context)
        {
            this._context = context;
        }

        //Enviar la lista de Cities
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                Thread.Sleep(500);
                var listaCities = await _context.City.ToListAsync();
                return Ok(listaCities);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Retornar la ciudad con la id que ha pasado
        [HttpGet("{cityId}")]
        public async Task<IActionResult> Get(int cityId)
        {
            try
            {
                var city = await _context.Country.FindAsync(cityId);
                if (city == null)
                {
                    return NotFound();
                }
                return Ok(city);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // Eliminar el ciudad con la id pasada 
        [HttpDelete("{cityId}")]
        public async Task<IActionResult> Delete(int cityId)
        {
            try
            {
                var city = await _context.Country.FindAsync(cityId);
                if (city == null)
                {
                    return NotFound();
                }

                _context.Country.Remove(city);
                await _context.SaveChangesAsync();

                return NoContent();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
