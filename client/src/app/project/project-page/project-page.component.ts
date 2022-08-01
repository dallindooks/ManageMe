import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Project } from 'src/app/models/project';
import { CreateTaskComponent } from 'src/app/Task/create-task/create-task.component';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  project: Project;
  tasks: Task[];
  public href: string = "";
  modalRef: MdbModalRef<CreateTaskComponent> | null = null;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private modalService: MdbModalService
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

    TaskCreate(task: Task){
      console.log(task);
      this.httpClient.post<Task>('https://localhost:7261/api/Task', this.currentProject)
        .subscribe((response) => {
          console.log(response);
        });
    }

    openModal() {
      this.modalRef = this.modalService.open(CreateTaskComponent)
    }
}
