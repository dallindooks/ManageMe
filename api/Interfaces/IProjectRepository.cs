using api.Models;

namespace api.Interfaces
{
    public interface IProjectRepository
    {
        ICollection<Project> GetProjects();
        Project GetProject(int id);
        Project GetProject(string title);
        bool ProjectExists(int projectId);
        bool CreateProject(Project project);
        bool DeleteProject(Project project);
        bool UpdateProject(Project project);
        bool Save();
    }
}