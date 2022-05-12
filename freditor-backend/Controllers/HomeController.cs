using FreditorBackend.Models.UserModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FreditorBackend.Controllers
{
    /// <summary>
    /// Class <c>Home</c> fetches user credentials for login into home page.
    /// </summary>
    [Authorize]
    [Route("api/users")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public HomeController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var getUsers = await _context.FredUser.ToListAsync();
            return StatusCode(201, new { getUsers });
        }
    }
}
