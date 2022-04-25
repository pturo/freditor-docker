using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreditorBackend.Models.EditorFileModel
{
    /// <summary>
    /// Class <c>EditorFile</c> represents list of created files in Editor.
    /// </summary>
    public class EditorFile
    {
        /// <summary>
        /// Property <c>EditorFileId</c> represents an unique identity for a single file.
        /// </summary>
        [Key]
        public int EditorFileId { get; set; }

        /// <summary>
        /// Property <c>EditorFileName</c> returns file based on its name.
        /// </summary>
        [Required]
        [Column(TypeName="nvarchar(50)")]
        public string EditorFileName { get; set; }
    }
}
