using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterUser(LoginUser user);
        Task<bool> Login(LoginUser user);
        string GenerateTokenString(LoginUser user);

        Task<bool> ChangePassword(LoginUser user, ChangePassword model);
    }
}