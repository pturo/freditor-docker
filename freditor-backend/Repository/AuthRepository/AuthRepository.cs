using FreditorBackend.Models.UserModel;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Threading.Tasks;

namespace FreditorBackend.Repository.AuthRepository
{
    /// <summary>
    /// Class <c>AuthRepository</c> determines if user already exists in database and does register and login operation.
    /// </summary>
    public class AuthRepository : IAuthRepository
    {
        private readonly DatabaseContext _context;

        public AuthRepository(DatabaseContext context) 
        {
            _context = context;
        }

        public async Task<bool> IsUserExist(string username)
        {
            if(await _context.FredUser.AnyAsync(x => x.Email == username))
            {
                return true;
            }

            return false;
        }

        public async Task<UserDto> Login(string username, string password)
        {
            var user = await _context.FredUser.FirstOrDefaultAsync(x => x.UserName == username);
            if(user == null)
            {
                return null;
            }
            
            if(!VerifyPasswordHash(password, user.Password, user.Salt))
            {
                return null;
            }

            return user; // auth successful
        }

        public async Task<UserDto> Register(UserDto user, string password)
        {
            byte[] passwordHash, salt;
            CreatePasswordHash(password, out passwordHash, out salt);
            user.Password = passwordHash;
            user.Salt = salt;

            await _context.FredUser.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] salt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(salt)) 
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for(int i = 0; i < computedHash.Length; i++)
                {
                    if(computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
            }

            return true;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] salt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                salt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
