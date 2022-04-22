using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreditorBackend.Models.NoteModel
{
    /// <summary>
    /// Class <c>Note</c> represents a single note created by user.
    /// </summary>
    public class NoteDto
    {
        /// <summary>
        /// Property <c>NoteId</c> represents an unique identity for a single note.
        /// </summary>
        [Key]
        public int NoteId{ get; set; }

        /// <summary>
        /// Property <c>NoteTitle</c> describes note's title.
        /// </summary>
        [Required]
        [Column(TypeName="nvarchar(50)")]
        public string NoteTitle { get; set; }

        /// <summary>
        /// Property <c>NoteContent</c> contains content for a note.
        /// </summary>
        [Required]
        [Column(TypeName="nvarchar(max)")]
        public string NoteContent { get; set; }
    }
}
