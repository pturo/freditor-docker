using FreditorBackend.Models.UserModel;
using FreditorBackend.Repository.NoteRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using FreditorBackend.Models.NoteModel;
using Microsoft.AspNetCore.Authorization;

namespace FreditorBackend.Controllers
{
    /// <summary>
    /// Class <c>NoteController</c> manages note store functionality.
    /// </summary>
    [Authorize]
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
            var getNotes = await _context.FredNote.ToListAsync();
            return StatusCode(201, new { getNotes });
        }

        [HttpGet("{noteId}")]
        public async Task<IActionResult> GetNote(int noteId)
        {
            var getNote = await _context.FredNote.FindAsync(noteId);
            if(noteId != getNote.NoteId)
            {
                return BadRequest("There is no note with given Id!");
            }

            return StatusCode(201, new { getNote });
        }

        [HttpPost("add-note")]
        public async Task<IActionResult> AddNote(NoteDto note)
        {
            if(await _repo.IsNoteExist(note.NoteTitle))
            {
                return BadRequest("Title of given note already exists!");
            }

            var createNote = await _repo.AddNote(note.NoteTitle, note.NoteContent);
            return StatusCode(201, new { createNote });
        }

        [HttpPut("edit-note/{noteId}")]
        public async Task<IActionResult> EditNote(int noteId, NoteDto note)
        {
            if(noteId != note.NoteId)
            {
                return BadRequest("Note does not exist!");
            }

            var editNote = await _repo.EditNote(noteId, note);
            return StatusCode(201, new { editNote });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteNote(int noteId)
        {
            var note = await _context.FredNote.FindAsync(noteId);
            if (note.NoteId != noteId)
            {
                return BadRequest("Id of given note does not exist!");
            }

            var deleteNote = await _repo.DeleteNote(noteId);
            return StatusCode(201, new { deleteNote });
        }
    }
}
