using FreditorBackend.Models.TaskModel;
using FreditorBackend.Models.UserModel;
using FreditorBackend.Repository.TaskRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FreditorBackend.Controllers
{
    /// <summary>
    /// Class <c>TaskController</c> manages task storage funcionality
    /// </summary>
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
            var data = await _context.FredTask.ToListAsync();
            return Ok(data);
        }

        [HttpPost("add-task")]
        public async Task<IActionResult> AddTask(TaskDto task)
        {
            if(await _repo.IsTaskExist(task.TaskTitle))
            {
                return BadRequest("Title of given task already exists!");
            }

            var createTask = await _repo.AddTask(task.TaskTitle, task.TaskElements, task.DeadLine);
            return StatusCode(201, new { tasktitle = task.TaskTitle, taskelements = task.TaskElements, deadline = task.DeadLine });
        }
    }
}
