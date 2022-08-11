import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Task } from 'src/app/models/tasks';
import { ProjectService } from 'src/app/services/projectService';
import { TaskService } from 'src/app/services/task-service.service';
import { TaskCardComponent } from 'src/app/Task/task-card/task-card.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  project: Project;
  tasks: Task[];
  public href: string = "";
  today = new Date().toISOString().substring(0,11).concat("00:00:00");
  formattedDates: string;
  baseUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private projectService: ProjectService,
    private taskCard: TaskCardComponent,
    private taskService: TaskService
    ) {
   }
   currentURL: string = this.router.url;
   currentProject: string = this.currentURL.match(/[0-9]+$/).toString();

  ngOnInit(): void {
    this.getProject();
    this.getProjectTasks();
  }


    getProject(){
      this.httpClient.get<Project>
      (this.baseUrl + 'Project/' + this.currentProject)
        .subscribe(response => {
          console.log(response);
          this.project = response;
      });
    }

    getProjectTasks(){
      this.httpClient.get<Task[]>
      (this.baseUrl + 'Tasks/project/projectId?projectId=' + this.currentProject)
        .subscribe(response => {
          this.tasks = response;
          this.tasks.forEach(task => task.dueDate = task.dueDate.substring(0,11).concat("00:00:00"));
          console.log(this.tasks);
        })
    }

    taskComplete(id: Number){
      const currentTask = this.tasks.find((x) => {return x.id === id});;
    
      if(currentTask.completed){
        currentTask.completed = false;
      }
      if(!currentTask.completed){
        currentTask.completed = true;
      }
      console.log(currentTask);
      this.taskService.taskComplete(id, currentTask).subscribe();
    }
}
