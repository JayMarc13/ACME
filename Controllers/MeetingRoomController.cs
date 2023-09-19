using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Identity.Client;
using System.Text.Json;

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
        [HttpGet ("RoomsWithOffices")]
        public async Task<IActionResult> GetMeetingRoomsWithOffices()
        {
            try
            {
                var listaMeetingRoom = await _context.MeetingRoom.
                    Join(
                    _context.Office,
                    MeetingRoom => MeetingRoom.OfficeId,
                    Office => Office.OfficeId,
                    (MeetingRoom, Office) => new
                    { 
                        MeetingRoomId = MeetingRoom.MeetingRoomId,
                        MeetingRoomName = MeetingRoom.MeetingRoomName,
                        OfficeId = MeetingRoom.OfficeId,
                        NameOffice = Office.NameOffice
                    }
                ).ToListAsync();

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

        //Añadir nueva Meeting Rooms
        //[HttpPost]
        //public async Task<IActionResult> Post(MeetingRoom meetingRoom)
        //{
        //    try
        //    {
        //        _context.Add(meetingRoom);
        //        await _context.SaveChangesAsync();

        //        return CreatedAtAction("Get", new { MeetingRoomId = meetingRoom.MeetingRoomId }, meetingRoom);
        //    }
        //    catch (Exception e)
        //    {

        //        return BadRequest(e.Message);
        //    }
        //}

        [HttpGet("offices")]
        public IActionResult MeetingroomOffices()
        {
            try
            {
                List<Office> offices = _context.Office.ToList();
                return Ok(offices);
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
                meetingRoomItem.OfficeId = meetingRoom.OfficeId;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("office/{officeId}")]
        public async Task<IActionResult> GetRoomsByOffice(int officeId)
        {
            try
            {
                var meeting = await _context.MeetingRoom.Where(m => m.OfficeId == officeId).ToListAsync();

                if (meeting.Count == 0)
                {
                    return NotFound();
                }

                return Ok(meeting);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
    
