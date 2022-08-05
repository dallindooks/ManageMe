import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';


@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  project: Project;
  tasks: Task[];
  public href: string = "";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
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
      ('https://localhost:7261/api/Project/' + this.currentProject)
        .subscribe(response => {
          console.log(response);
          this.project = response;
      });
    }

    getProjectTasks(){
      this.httpClient.get<Task[]>
      ('https://localhost:7261/api/Tasks/project/projectId?projectId=' + this.currentProject)
        .subscribe(response => {
          console.log(response);
          this.tasks = response;
        })
    }
}
