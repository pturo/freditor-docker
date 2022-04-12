using FreditorBackend.Models.TaskModel;
using FreditorBackend.Models.UserModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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

        public async Task<bool> IsTaskExist(string tasktitle)
        {
            if(await _context.FredTask.AnyAsync(x => x.TaskTitle == tasktitle))
            {
                return true;
            }

            return false;
        }
        
        public async Task<TaskDto> AddTask(string tasktitle, string[] taskelements, DateTime date)
        {
            TaskDto task = new TaskDto();
            task.TaskTitle = tasktitle;
            task.TaskElements = taskelements;
            task.DeadLine = date;

            await _context.FredTask.AddAsync(task);
            await _context.SaveChangesAsync();

            return task;
        }
    }
}
