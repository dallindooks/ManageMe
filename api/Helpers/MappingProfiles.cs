using api.Dto;
using api.Models;
using AutoMapper;

namespace api.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Project, ProjectDto>();
            CreateMap<ProjectDto, Project>();
            CreateMap<ToDo, TaskDto>();
            CreateMap<TaskDto, ToDo>();
        }
    }
}