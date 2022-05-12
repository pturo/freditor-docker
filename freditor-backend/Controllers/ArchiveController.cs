using FreditorBackend.Models.UserModel;
using FreditorBackend.Repository.ArchiveRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace FreditorBackend.Controllers
{
    /// <summary>
    /// Class <c>ArchiveController</c> manages archive store functionality.
    /// </summary>
    [Authorize]
    [Route("api/archives")]
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

        [HttpGet("getTaskArchives")]
        public async Task<IActionResult> GetTaskArchives() 
        {
            var getTaskArchives = await (from archive in _context.FredArchive join task in _context.FredTask on archive.ArchiveTaskId equals task.TaskId select task.TaskTitle).AsNoTracking().ToListAsync();
            
            return StatusCode(201, new { getTaskArchives });
        }

        [HttpGet("getNoteArchives")]
        public async Task<IActionResult> GetNoteArchives()
        {
            var getNoteArchives = await (from archive in _context.FredArchive join note in _context.FredNote on archive.ArchiveNoteId equals note.NoteId select note.NoteTitle).AsNoTracking().ToListAsync();
            return StatusCode(201, new { getNoteArchives });
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
