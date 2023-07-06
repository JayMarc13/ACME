using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterUser(LoginUser user);
        Task<bool> Login(LoginUser user);
    }
}