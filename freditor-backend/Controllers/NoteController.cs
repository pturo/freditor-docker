using FreditorBackend.Models.UserModel;
using FreditorBackend.Repository.NoteRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using FreditorBackend.Models.NoteModel;

namespace FreditorBackend.Controllers
{
    /// <summary>
    /// Class <c>NoteController</c> manages note store functionality.
    /// </summary>
    [Route("api/notes")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly INoteRepository _repo;

        public NoteController(DatabaseContext context, INoteRepository repo)
        {
            _context = context;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            var data = await _context.FredNote.ToListAsync();
            return Ok(data);
        }

        [HttpPost("add-note")]
        public async Task<IActionResult> AddNote(NoteDto note)
        {
            if(await _repo.IsNoteExist(note.NoteTitle))
            {
                return BadRequest("Title of given note already exists!");
            }

            var createNote = await _repo.AddNote(note.NoteTitle, note.NoteContent);
            return StatusCode(201, new { note.NoteTitle, note.NoteContent });
        }

        [HttpPut("edit-note/{noteId}")]
        public async Task<IActionResult> EditNote(int noteId, NoteDto note)
        {
            if(noteId != note.NoteId)
            {
                return BadRequest("Note does not exist!");
            }

            var editedNote = await _repo.EditNote(noteId, note);
            return StatusCode(201, new { editedNote });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteNote(int noteId)
        {
            var note = await _context.FredNote.FindAsync(noteId);
            if (note.NoteId != noteId)
            {
                return BadRequest("Id of given note does not exist!");
            }

            var editedNote = await _repo.DeleteNote(noteId);
            return StatusCode(201, "Note deleted successfully!");
        }
    }
}
