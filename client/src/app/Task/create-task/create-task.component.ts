import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/projectService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  popupOn = 'openPopup';
  popupOff = 'closePopup';
  popupStyle = {'closePopup': true, 'openPopup': false};
  popupStyleDelete = {'closePopup': true, 'openPopup': false};
  blockStyle = {'block': false};
  taskCreateForm: NgForm;
  task: Task;
  baseUrl= environment.apiUrl;

  currentURL: string = this.router.url;
  currentProject: string = this.currentURL.match(/[0-9]+$/).toString();


  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private projectService: ProjectService) {}

  ngOnInit(): void {
  }

  openPopup() {
    this.popupStyle['openPopup'] = this.popupStyle['openPopup'] = true;
    this.blockStyle['block'] = this.blockStyle['block'] = true;
  }

  openPopupDelete() {
    this.popupStyleDelete['openPopup'] = this.popupStyleDelete['openPopup'] = true;
    this.blockStyle['block'] = this.blockStyle['block'] = true;
  }

  closePopup(){
    this.popupStyle['openPopup'] = this.popupStyle['openPopup'] = false;
    this.blockStyle['block'] = this.blockStyle['block'] = false;
  }

  closePopupDelete(){
    this.popupStyleDelete['openPopup'] = this.popupStyleDelete['openPopup'] = false;
    this.blockStyle['block'] = this.blockStyle['block'] = false;
  }

  TaskCreate(task: Task){
    console.log(task);
    this.httpClient.post<Task>(this.baseUrl + 'Tasks?projectId=' + this.currentProject, task)
      .subscribe((response) => {
        console.log(response);
      });
      window.location.reload();
  }

  deleteProject(){
    this.projectService.deleteProject(this.currentProject).subscribe(response => {
      console.log(response);
    })
    this.router.navigate(['/project-list']);
  }

}
