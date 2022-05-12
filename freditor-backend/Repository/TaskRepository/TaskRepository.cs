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

        public async Task<TaskDto> EditTask(int taskId, TaskDto task)
        {
            if(taskId != task.TaskId)
            {
                return null;
            }

            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return task;
        }

        public async Task<IEnumerable<TaskDto>> DeleteTask(int taskId)
        {
            var task = await _context.FredTask.FindAsync(taskId);
            if(taskId != task.TaskId)
            {
                return null;
            }

            _context.FredTask.Remove(task);
            await _context.SaveChangesAsync();

            return await _context.FredTask.ToListAsync();
        }
    }
}
