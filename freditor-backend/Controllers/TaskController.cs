using FreditorBackend.Models.TaskModel;
using FreditorBackend.Models.UserModel;
using FreditorBackend.Repository.TaskRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FreditorBackend.Controllers
{
    /// <summary>
    /// Class <c>TaskController</c> manages task storage funcionality
    /// </summary>
    [Authorize]
    [Route("api/tasks")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly ITaskRepository _repo;

        public TaskController(DatabaseContext context, ITaskRepository repo) 
        {
            _context = context;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var getTasks = await _context.FredTask.ToListAsync();
            return StatusCode(201, new { getTasks });
        }

        [HttpGet("{taskId}")]
        public async Task<IActionResult> GetTask(int taskId)
        {
            var getTask = await _context.FredTask.FindAsync(taskId);
            if (taskId != getTask.TaskId)
            {
                return BadRequest("There is no task with given Id!");
            }

            return StatusCode(201, new { getTask });
        }

        [HttpPost("add-task")]
        public async Task<IActionResult> AddTask(TaskDto task)
        {
            if(await _repo.IsTaskExist(task.TaskTitle))
            {
                return BadRequest("Title of given task already exists!");
            }

            var createTask = await _repo.AddTask(task.TaskTitle, task.TaskElements, task.DeadLine);
            return StatusCode(201, new { createTask });
        }

        [HttpPut("edit-task/{taskId}")]
        public async Task<IActionResult> EditTask(int taskId, TaskDto task)
        {
            if(taskId != task.TaskId)
            {
                return BadRequest("Task with given ID does not exist!");
            }

            var editTask = await _repo.EditTask(taskId, task);
            return StatusCode(201, new { editTask });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteNote(int taskId)
        {
            var task = await _context.FredTask.FindAsync(taskId);
            if(taskId != task.TaskId)
            {
                return BadRequest("Task with given ID does not exist!");
            }

            var deleteTask = await _repo.DeleteTask(taskId);
            return StatusCode(201, new { deleteTask });
        }
    }
}
