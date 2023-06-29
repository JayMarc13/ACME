namespace webapi.Models
{
    public class Reserve
    {
        public int ResrveId { get; set; }
        public int MeetingRoomId { get; set; }
        public string DataReserva { get; set; }
        public int HoraInici { get; set; }
        public int HoraFi { get; set; }
        public string UserId { get; set; }
        
    }
}
