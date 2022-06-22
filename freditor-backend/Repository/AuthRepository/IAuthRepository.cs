using FreditorBackend.Models.UserModel;
using System.Threading.Tasks;

namespace FreditorBackend.Repository.AuthRepository
{
    /// <summary>
    /// Interface <c>IAuthRepository</c> is a base repository interface.
    /// </summary>
    public interface IAuthRepository
    {
        Task<UserDto> Signup(UserDto user, string password);
        Task<UserDto> Login(string username, string password);
        Task<bool> IsUserExist(string username);
    }
}
