using api.Dto;
using api.Interfaces;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : Controller
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IMapper _mapper;

        public ProjectController(IProjectRepository projectRepository, IMapper mapper)
        {
            _projectRepository = projectRepository;
            this._mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ProjectDto>))]
        public IActionResult GetProjects()
        {
            var projects = _mapper.Map<List<ProjectDto>>(_projectRepository.GetProjects());

            if (!ModelState.IsValid) return BadRequest(ModelState);

            return Ok(projects);
            
        }

        [HttpGet("{projectId:int}")]
        [ProducesResponseType(200, Type = typeof(Project))]
        public IActionResult GetProject(int projectId)
        {
            if (!_projectRepository.ProjectExists(projectId)) return NotFound(); 

              var project = _mapper.Map<ProjectDto>(_projectRepository.GetProject(projectId));

            if (!ModelState.IsValid) return BadRequest(ModelState);

            return Ok(project);  
        }

        [HttpGet("{projectTitle:alpha}")]
        public IActionResult GetProject(string projectTitle)
        {

            var project = _mapper.Map<ProjectDto>(_projectRepository.GetProject(projectTitle));
            return Ok(project);
        }

        [HttpPost]
        public IActionResult CreateProject([FromBody] ProjectDto projectCreate)
        {
            if (projectCreate == null) return BadRequest(ModelState);

            var project = _projectRepository.GetProjects()
                .Where(p => p.Title.Trim().ToUpper() == projectCreate.Title.TrimEnd().ToUpper())
                .FirstOrDefault();

            if (project != null)
            {
                ModelState.AddModelError("", "Project already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectMap =_mapper.Map<Project>(projectCreate);

            if (!_projectRepository.CreateProject(projectMap))
            {
                ModelState.AddModelError("", "Something went wrong upon save");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully Created");
        }

        [HttpDelete("projectId")]
        public IActionResult DeleteTask(int projectId)
        {
            if (!_projectRepository.ProjectExists(projectId))
            {
                return NotFound();
            }

            var projectToDelete = _projectRepository.GetProject(projectId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_projectRepository.DeleteProject(projectToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting owner");
            }

            return NoContent();
        }

        [HttpPut("{projectId}")]
        public IActionResult UpdateTask(int projectId, [FromBody] ProjectDto updatedProject)
        {
            if (updatedProject == null)
                return BadRequest(ModelState);

            if (projectId != updatedProject.ID)
                return BadRequest(ModelState);

            if (!_projectRepository.ProjectExists(projectId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var projectMap = _mapper.Map<Project>(updatedProject);

            if (!_projectRepository.UpdateProject(projectMap))
            {
                ModelState.AddModelError("", "Something went wrong updating task");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
        
    }
}