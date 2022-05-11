using FreditorBackend.Models.UserModel;
using FreditorBackend.Repository.ArchiveRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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
            var task = await _context.FredTask.ToListAsync();
            var taskId = 0;
            var taskTitle = "";
            task.ForEach(x => { taskId = x.TaskId; taskTitle = x.TaskTitle; });
            var getTaskArchivesWithParams = new List<SqlParameter>();
            getTaskArchivesWithParams.Add(new SqlParameter("@TaskTitle", taskTitle));
            getTaskArchivesWithParams.Add(new SqlParameter("@TaskId", taskId));
            var getTaskArchives = _context.FredArchive.FromSqlRaw("SELECT (@TaskTitle) FROM dbo.FredArchive, dbo.FredTask WHERE ArchiveTaskId=@TaskId", getTaskArchivesWithParams.ToArray());
            return StatusCode(201, new { getTaskArchives });
        }

        [HttpGet("getNoteArchives")]
        public async Task<IActionResult> GetNoteArchives()
        {
            var sql = string.Format("select (NoteTitle) from dbo.FredArchive, dbo.FredNote where ArchiveNoteId = NoteId");
            var getNoteArchives = await _context.FredArchive.FromSqlRaw(sql).ToListAsync();
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
