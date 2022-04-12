using FreditorBackend.Models.TaskModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FreditorBackend.Repository.TaskRepository
{
    /// <summary>
    /// Interface <c>ITaskRepository</c> is a base repository interface.
    /// </summary>
    public interface ITaskRepository
    {
        Task<TaskDto> AddTask(string tasktitle, string[] taskelements, DateTime date);

        Task<bool> IsTaskExist(string tasktitle);
    }
}
