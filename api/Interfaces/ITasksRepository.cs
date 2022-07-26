using api.Models;

namespace api.Interfaces
{
    public interface ITasksRepository
    {
        ICollection<ToDo> GetTasks();
        ICollection<ToDo> GetTasksOfProject(int projectId);
        ToDo GetTask(string title);
        ToDo GetTask(int id);
        bool TaskExists(int id);
        bool CreateTask(ToDo newTask);
        bool UpdateTask(ToDo task);
        bool DeleteTask(ToDo task);
        bool Save();
    }
}