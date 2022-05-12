using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreditorBackend.Models.ArchiveModel
{
    /// <summary>
    /// Class <c>Archive</c> represents list of archived files like tasks, notes and files.
    /// </summary>
    public class ArchiveDto
    {
        /// <summary>
        /// Property <c>ArchiveId</c> represents an unique identity for a single archive.
        /// </summary>
        [Key]
        public int ArchiveId { get; set; }

        /// <summary>
        /// Property <c>ArchiveTask</c> contains archived task.
        /// </summary>
        [ForeignKey("ArchiveTaskId")]
        public int? ArchiveTaskId { get; set; }

        /// <summary>
        /// Property <c>ArchiveNote</c> contains archived note.
        /// </summary>
        [ForeignKey("ArchiveNoteId")]
        public int? ArchiveNoteId { get; set; }
    }
}
