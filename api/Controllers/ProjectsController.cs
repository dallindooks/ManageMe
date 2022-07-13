using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly DataContext _context;
        public ProjectsController(DataContext context)
        {
            _context = context;
        }

        //Getting a list of all projects

        [HttpGet]
        public async Task<ActionResult<List<Projects>>> GetProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        //Getting a single project by its ID

        [HttpGet("{id}")]
        public async Task<ActionResult<Projects>> GetProject(int id)
        {
            return await _context.Projects.FindAsync(id);
        }
    }
}