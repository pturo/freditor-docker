using FreditorBackend.Models.TaskModel;
using FreditorBackend.Models.UserModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace FreditorBackend.Repository.TaskRepository
{
    /// <summary>
    /// Class <c>TaskRepository</c> determines if task title exists in database and adds new task there.
    /// </summary>
    public class TaskRepository : ITaskRepository
    {
        private readonly DatabaseContext _context;

        public TaskRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<bool> IsTaskExist(string taskTitle)
        {
            if(await _context.FredTask.AnyAsync(x => x.TaskTitle == taskTitle))
            {
                return true;
            }

            return false;
        }
        
        public async Task<TaskDto> AddTask(string taskTitle, string[] taskElements, DateTime taskDate)
        {
            TaskDto task = new TaskDto();
            task.TaskTitle = taskTitle;
            task.TaskElements = taskElements;
            task.DeadLine = taskDate;

            await _context.FredTask.AddAsync(task);
            await _context.SaveChangesAsync();

            return task;
        }
    }
}
