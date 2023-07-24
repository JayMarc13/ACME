// Modificar el controlador ReserveController
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize] // Verificar el token
    public class ReserveController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public ReserveController(AplicationDbContext context)
        {
            this._context = context;
        }

        // Obtener la lista de Reservas
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listaReservas = await _context.Reserve.ToListAsync();
                return Ok(listaReservas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Obtener una reserva por su id
        [HttpGet("{reserveId}")]
        public async Task<IActionResult> Get(int reserveId)
        {
            try
            {
                var reserva = await _context.Reserve.FindAsync(reserveId);
                if (reserva == null)
                {
                    return NotFound();
                }
                return Ok(reserva);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // Eliminar una reserva por su id
        [HttpDelete("{reserveId}")]
        public async Task<IActionResult> Delete(int reserveId)
        {
            try
            {
                var reserva = await _context.Reserve.FindAsync(reserveId);
                if (reserva == null)
                {
                    return NotFound();
                }

                _context.Reserve.Remove(reserva);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // Agregar una reserva
        [HttpPost]
        public async Task<IActionResult> Post(Reserve reserve)
        {
            try
            {
                _context.Add(reserve);
                await _context.SaveChangesAsync();

                return CreatedAtAction("Get", new { ReserveId = reserve.ReserveId }, reserve);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // Actualizar una reserva por su id
        [HttpPut("{reserveId}")]
        public async Task<IActionResult> Put(int reserveId, Reserve reserve)
        {
            try
            {
                if (reserveId != reserve.ReserveId)
                {
                    return BadRequest();
                }

                var reservaItem = await _context.Reserve.FindAsync(reserveId);

                if (reservaItem == null)
                {
                    return NotFound();
                }

                reservaItem.MeetingRoomId = reserve.MeetingRoomId;
                reservaItem.ReserveDate = reserve.ReserveDate;
                reservaItem.StartTime = reserve.StartTime;
                reservaItem.EndTime = reserve.EndTime;
                reservaItem.UserId = reserve.UserId;

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
