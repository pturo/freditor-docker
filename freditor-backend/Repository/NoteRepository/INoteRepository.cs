using FreditorBackend.Models.NoteModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FreditorBackend.Repository.NoteRepository
{
    public interface INoteRepository
    {
        Task<NoteDto> AddNote(string noteTitle, string noteContent);

        Task<NoteDto> EditNote(int noteId, NoteDto note);

        Task<IEnumerable<NoteDto>> DeleteNote(int noteId);

        Task<bool> IsNoteExist(string noteTitle);
    }
}
