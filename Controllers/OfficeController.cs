using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfficeController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public OfficeController(AplicationDbContext context)
        {
            this._context = context;
        }

        //Enviar la lista de Offices
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                Thread.Sleep(500);
                var listaOffice = await _context.Office.ToListAsync();
                return Ok(listaOffice);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Retornar la oficina con la id que ha pasado
        [HttpGet("{officeId}")]
        public async Task<IActionResult> Get(int officeId)
        {
            try
            {
                var office = await _context.Country.FindAsync(officeId);
                if (office == null)
                {
                    return NotFound();
                }
                return Ok(office);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // Eliminar oficina con la id pasada 
        [HttpDelete("{officeId}")]
        public async Task<IActionResult> Delete(int officeId)
        {
            try
            {
                var office = await _context.Country.FindAsync(officeId);
                if (office == null)
                {
                    return NotFound();
                }

                _context.Country.Remove(office);
                await _context.SaveChangesAsync();

                return NoContent();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        ////Añadir nuevo país
        //[HttpPost]
        //public async Task<IActionResult> Post(Country country)
        //{
        //    try
        //    {
        //        _context.Add(country); 
        //        await _context.SaveChangesAsync();

        //        return CreatedAtAction("Get", new { CountryId = country.CountryId }, country);
        //    }
        //    catch (Exception e)
        //    {

        //        return BadRequest(e.Message);
        //    }
        //}

        [HttpPut("{officeId}")]
        public async Task<IActionResult> Put(int officeId, Office office)
        {
            try
            {
                if(officeId != office.OfficeId)
                {
                    return BadRequest();
                }

                var officeItem = await _context.Office.FindAsync(officeId);

                if (officeItem == null)
                {
                    return NotFound();
                }

                officeItem.NameOffice = office.NameOffice;

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
