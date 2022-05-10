using FreditorBackend.Models.UserModel;
using FreditorBackend.Repository.ArchiveRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FreditorBackend.Controllers
{
    /// <summary>
    /// Class <c>ArchiveController</c> manages archive store functionality.
    /// </summary>
    [Authorize]
    [Route("api/archive")]
    [ApiController]
    public class ArchiveController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly IArchiveRepository _repo;

        public ArchiveController(DatabaseContext context, IArchiveRepository repo)
        {
            _context = context;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetArchives() 
        {
            var getArchives = await _context.FredArchive.ToListAsync();
            return StatusCode(201, new { getArchives });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteArchive(int archiveId)
        {
            var archive = await _context.FredArchive.FindAsync(archiveId);
            if (archive.ArchiveId != archiveId)
            {
                return BadRequest("Id of given archive does not exist!");
            }

            var deleteArchive = await _repo.DeleteArchive(archiveId);
            return StatusCode(201, new { deleteArchive });
        }
    }
}
