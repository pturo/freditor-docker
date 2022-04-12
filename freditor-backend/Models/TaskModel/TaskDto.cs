using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreditorBackend.Models.TaskModel
{
    /// <summary>
    /// Class <c>TaskDto</c> contains task elements like: title, content and date.
    /// </summary>
    public class TaskDto
    {
        /// <summary>
        /// Property <c>TaskId</c> represents unique identity for a signle task in database.
        /// </summary>
        [Key]
        public int TaskId { get; set; }

        /// <summary>
        /// Property <c>TaskTitle</c> is a task's title.
        /// </summary>
        [Required]
        public string TaskTitle { get; set; }

        /// <summary>
        /// Property <c>TaskElements</c> is an array of task's content.
        /// </summary>
        [Required]
        public string[] TaskElements { get; set; }

        /// <summary>
        /// Property <c>DeadLine</c> is a date for completing task.
        /// </summary>
        [Required]
        public DateTime DeadLine { get; set; }
    }
}
