using api.Dto;
using api.Interfaces;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : Controller
    {
        private readonly ITasksRepository _taskRepository;
        private readonly IMapper _mapper;
        private readonly IProjectRepository _projectRepository;

        public TasksController(
            ITasksRepository taskRepository, 
            IMapper mapper,
            IProjectRepository projectRepository
            )
        {
            _mapper = mapper;
            _projectRepository = projectRepository;
            _taskRepository = taskRepository;
            
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<TaskDto>))]
        public IActionResult GetTasks()
        {
            var tasks = _mapper.Map<List<TaskDto>>(_taskRepository.GetTasks());

            if (!ModelState.IsValid) return BadRequest(ModelState);

            return Ok(tasks);
            
        }

        [HttpPost]
        public IActionResult CreateTask([FromQuery] int projectId ,[FromBody] TaskDto taskCreate)
        {
            if (taskCreate == null) return BadRequest(ModelState);

            var task = _taskRepository.GetTasks()
                .Where(p => p.Title.Trim().ToUpper() == taskCreate.Title.TrimEnd().ToUpper())
                .FirstOrDefault();

            if (task != null)
            {
                ModelState.AddModelError("", "Task already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var taskMap =_mapper.Map<ToDo>(taskCreate);

            taskMap.Project = _projectRepository.GetProject(projectId);

            if (!_taskRepository.CreateTask(taskMap))
            {
                ModelState.AddModelError("", "Something went wrong upon save");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully Created");
        }
        [HttpPut("{taskId}")]
        public IActionResult UpdateTask(int taskId, [FromBody] TaskDto updatedTask)
        {
            if (updatedTask == null)
                return BadRequest(ModelState);

            if (taskId != updatedTask.ID)
                return BadRequest(ModelState);

            if (!_taskRepository.TaskExists(taskId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var taskMap = _mapper.Map<ToDo>(updatedTask);

            if (!_taskRepository.UpdateTask(taskMap))
            {
                ModelState.AddModelError("", "Something went wrong updating task");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpGet("{taskId:int}")]
        public IActionResult GetProject(int taskId)
        {
            if (!_taskRepository.TaskExists(taskId)) return NotFound(); 

              var task = _mapper.Map<TaskDto>(_taskRepository.GetTask(taskId));

            if (!ModelState.IsValid) return BadRequest(ModelState);

            return Ok(task);  
        }

        [HttpGet("{taskTitle:alpha}")]
        public IActionResult GetTask(string taskTitle)
        {

            var task = _mapper.Map<TaskDto>(_taskRepository.GetTask(taskTitle));
            return Ok(task);
        }
        
        [HttpGet("project/projectId")]
        public IActionResult GetTasksOfProject(int projectId)
        {
            var tasks = _mapper.Map<List<TaskDto>>(_taskRepository.GetTasksOfProject(projectId));

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(tasks);
        }

        [HttpDelete("taskId")]
        public IActionResult DeleteTask(int taskId)
        {
            if (!_taskRepository.TaskExists(taskId))
            {
                return NotFound();
            }

            var taskToDelete = _taskRepository.GetTask(taskId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_taskRepository.DeleteTask(taskToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting owner");
            }

            return NoContent();
        }
    }
}