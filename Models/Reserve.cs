namespace Backend.Models
{
    public class Reserve
    {
        public int ReserveId { get; set; }

        //Foreign Key MeetingRoomId
        public int MeetingRoomId { get; set; }
        public DateTime ReserveDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }

        //Foreign Key MeetingRoomId
        public string UserId { get; set; }
    }
}
