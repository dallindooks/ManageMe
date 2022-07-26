namespace api.Models
{
    public class Project
    {
       public int ID { get; set; } 
       public string Title { get; set; }
       public string Description { get; set; }
       public DateTime CreatedDate { get; set; }
       public DateTime ExpectedCompletion { get; set; }
       public ICollection<ToDo> ToDos { get; set; }
    }
}