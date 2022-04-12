using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FreditorBackend.Models.NoteModel
{
    /// <summary>
    /// Class <c>Note</c> represents a single note created by user.
    /// </summary>
    public class Note
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
        [Column(TypeName="nvarchar(5000)")]
        public string NoteContent { get; set; }
    }
}
