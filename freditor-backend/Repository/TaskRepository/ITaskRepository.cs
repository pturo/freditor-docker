using FreditorBackend.Models.TaskModel;
using System;
using System.Threading.Tasks;

namespace FreditorBackend.Repository.TaskRepository
{
    /// <summary>
    /// Interface <c>ITaskRepository</c> is a base repository interface.
    /// </summary>
    public interface ITaskRepository
    {
        Task<TaskDto> AddTask(string taskTitle, string[] taskElements, DateTime taskDate);

        Task<bool> IsTaskExist(string taskTitle);
    }
}
