﻿namespace Backend.Models
{
    public class MeetingRoom
    {
        public int MeetingRoomId { get; set; }
        public string MeetingRoomName { get; set; }

        //Foreign Key OfficeId
        public int OfficeId { get; set; }
        
    }
}
