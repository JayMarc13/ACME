namespace Backend.Models
{
    public class ChangePasswordRequest
    {
        public LoginUser User { get; set; }
        public ChangePassword ChangePassword { get; set; }
    }
}
