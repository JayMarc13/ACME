namespace Backend.Models
{
    public class Users 
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UsesLastName { get; set; }
        public string UserPhone { get; set; }  
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }

        public String[] Roles { get; set; }
    }
}
