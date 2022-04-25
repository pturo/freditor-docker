using FreditorBackend.Models.NoteModel;
using FreditorBackend.Models.UserModel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FreditorBackend.Repository.NoteRepository
{
    public class NoteRepository: INoteRepository
    {
        private readonly DatabaseContext _context;

        public NoteRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<bool> IsNoteExist(string noteTitle)
        {
            if(await _context.FredNote.AnyAsync(x => x.NoteTitle == noteTitle))
            {
                return true;
            }

            return false;
        }

        public async Task<NoteDto> AddNote(string noteTitle, string noteContent)
        {
            NoteDto note = new NoteDto();
            note.NoteTitle = noteTitle;
            note.NoteContent = noteContent;

            await _context.FredNote.AddAsync(note);
            await _context.SaveChangesAsync();

            return note;
        }

        public async Task<NoteDto> EditNote(int noteId, NoteDto note)
        {
            if (noteId != note.NoteId)
            {
                // Do nothing
                return null;
            }

            _context.Entry(note).State = EntityState.Modified;

            _context.FredNote.Update(note);
            await _context.SaveChangesAsync();

            return note;
        }

        public async Task<IEnumerable<NoteDto>> DeleteNote(int noteId)
        {
            var note = await _context.FredNote.FindAsync(noteId);
            if (noteId != note.NoteId)
            {
                // Do nothing
                return null;
            }

            _context.FredNote.Remove(note);
            await _context.SaveChangesAsync();

            return await _context.FredNote.ToListAsync();
        }
    }
}
