import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/projectService';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projectId;
  projects: Project;
  tasks: Task;
  
  constructor(private projectService: ProjectService, private httpClient: HttpClient) {
    
  }

    ngOnInit(): void {
      this.getProjects();
      this.getTasks();
  }

  getProjects(){
    this.httpClient.get<Project>('https://localhost:7261/api/Project').subscribe(
        response => {
            console.log(response);
            this.projects = response;
        }
    )
  }

  getTasks(){
    this.httpClient.get<Task>('https://localhost:7261/api/Tasks').subscribe(
        response => {
            console.log(response);
            this.tasks = response;
        }
    )
  }
}
