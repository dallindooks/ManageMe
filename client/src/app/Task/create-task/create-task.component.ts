import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  popupOn = 'openPopup';
  popupOff = 'closePopup';
  popupStyle = {'closePopup': true, 'openPopup': false};
  blockStyle = {'block': false};
  taskCreateForm: NgForm;
  task: Task;

  currentURL: string = this.router.url;
  currentProject: string = this.currentURL.match(/[0-9]+$/).toString();


  constructor(
    private httpClient: HttpClient,
    private router: Router,) {}

  ngOnInit(): void {
  }

  openPopup() {
    this.popupStyle['openPopup'] = this.popupStyle['openPopup'] = true;
    this.blockStyle['block'] = this.blockStyle['block'] = true;
  }

  closePopup(){
    this.popupStyle['openPopup'] = this.popupStyle['openPopup'] = false;
    this.blockStyle['block'] = this.blockStyle['block'] = false;
  }

  TaskCreate(task: Task){
    console.log(task);
    this.httpClient.post<Task>('https://localhost:7261/api/Tasks?projectId=' + this.currentProject, task)
      .subscribe((response) => {
        console.log(response);
      });
      window.location.reload();
  }

}
