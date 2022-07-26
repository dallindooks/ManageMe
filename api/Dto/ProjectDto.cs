namespace api.Dto
{
    public class ProjectDto
    {
       public int ID { get; set; } 
       public string Title { get; set; }
       public string Description { get; set; }
       public DateTime CreatedDate { get; set; }
       public DateTime ExpectedCompletion { get; set; }
    }
}