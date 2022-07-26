using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly DataContext _context;

    public ProjectRepository(DataContext context)
    {
            _context = context;
        
    }

        public bool CreateProject(Project project)
        {
            _context.Add(project);
            return Save();
        }

        public bool DeleteProject(Project project)
        {
            _context.Remove(project);
            return Save();
        }

        public Project GetProject(int id)
        {
            return _context.Projects.Where(x => x.ID == id).FirstOrDefault();
        }

        public Project GetProject(string title)
        {
            return _context.Projects.Where(x => x.Title == title).FirstOrDefault();
        }

        public ICollection<Project> GetProjects()
        {
            return _context.Projects.OrderBy(p => p.ID).ToList();
        }

        public bool ProjectExists(int projectId)
        {
            return _context.Projects.Any(x => x.ID == projectId);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateProject(Project project)
        {
            _context.Update(project);
            return Save();
        }
    }
}