import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Task } from 'src/app/models/tasks';
import { ProjectService } from 'src/app/services/projectService';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projectId;
  projects: Project[];
  tasks: Task[];
  
  constructor(private projectService: ProjectService, private httpClient: HttpClient) {
    
  }

    ngOnInit(): void {
      this.projectService.getProjects().subscribe((data: Project[]) => {
        console.log(data);
        this.projects = data;
      });
      this.getTasks();
  }

  getTasks(){
    this.httpClient.get<Task[]>('https://localhost:7261/api/Tasks').subscribe(
        response => {
            this.tasks = response;
            console.log(this.tasks);
        }
    )
  }
}
