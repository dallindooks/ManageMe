using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repositories
{
    public class TaskRepository : ITasksRepository
    {
        private readonly DataContext _context;

        public TaskRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateTask(ToDo newTask)
        {
            _context.Add(newTask);
            return Save();
        }

        public bool DeleteTask(ToDo task)
        {
            _context.Remove(task);
            return Save();
        }

        public ToDo GetTask(string title)
        {
            return _context.ToDos.Where(x => x.Title == title).FirstOrDefault();
        }

        public ToDo GetTask(int id)
        {
            return _context.ToDos.Where(x => x.ID == id).FirstOrDefault();
        }

        public ICollection<ToDo> GetTasks()
        {
            return _context.ToDos.OrderBy(t => t.ID).ToList();
        }

        public ICollection<ToDo> GetTasksOfProject(int projectId)
        {
            return _context.ToDos.Where(x => x.Project.ID == projectId).ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool TaskExists(int id)
        {
            return _context.ToDos.Any(x => x.ID == id);
        }

        public bool UpdateTask(ToDo task)
        {
            _context.Update(task);
            return Save();
        }
    }
}