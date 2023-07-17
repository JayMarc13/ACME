using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingRoomController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public MeetingRoomController(AplicationDbContext context)
        {
            this._context = context;
        }

        //Enviar la lista de MeetingRooms
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                Thread.Sleep(500);
                var listaMeetingRoom = await _context.MeetingRoom.ToListAsync();
                return Ok(listaMeetingRoom);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Retornar la oficina con la id que ha pasado
        [HttpGet("{meetingRoomId}")]
        public async Task<IActionResult> Get(int meetingRoomId)
        {
            try
            {
                var meetingRoom = await _context.MeetingRoom.FindAsync(meetingRoomId);
                if (meetingRoom == null)
                {
                    return NotFound();
                }
                return Ok(meetingRoom);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // Eliminar oficina con la id pasada 
        [HttpDelete("{meetingRoomId}")]
        public async Task<IActionResult> Delete(int meetingRoomId)
        {
            try
            {
                var meetingRoom = await _context.MeetingRoom.FindAsync(meetingRoomId);
                if (meetingRoom == null)
                {
                    return NotFound();
                }

                _context.MeetingRoom.Remove(meetingRoom);
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
        public async Task<IActionResult> Post(MeetingRoom meetingRoom)
        {
            try
            {
                _context.Add(meetingRoom);
                await _context.SaveChangesAsync();

                return CreatedAtAction("Get", new { MeetingRoomId = meetingRoom.MeetingRoomId }, meetingRoom);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPut("{meetingRoomId}")]
        public async Task<IActionResult> Put(int meetingRoomId, MeetingRoom meetingRoom)
        {
            try
            {
                if (meetingRoomId != meetingRoom.MeetingRoomId)
                {
                    return BadRequest();
                }

                var meetingRoomItem = await _context.MeetingRoom.FindAsync(meetingRoomId);

                if (meetingRoomItem == null)
                {
                    return NotFound();
                }

                meetingRoomItem.MeetingRoomName = meetingRoom.MeetingRoomName;

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
    
