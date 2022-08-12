import { Component, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/tasks';
import { TaskService } from 'src/app/services/task-service.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  @Input() currentTask;
  popupOn = 'openPopup';
  popupOff = 'closePopup';
  popupStyle = {'closePopup': true, 'openPopup': false};
  detailStyle ={'closeDetail': false, 'opendetail': true};
  editStyle = {'closeEdit': true, 'openEdit': false};
  blockStyle = {'block': false};

  public editForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    completed: new FormControl('')
  });

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  openTaskCard(task: Task) {
    this.popupStyle['openPopup'] = this.popupStyle['openPopup'] = true;
    this.blockStyle['block'] = this.blockStyle['block'] = true;
  }

  openEditCard(){
    this.editStyle['openEdit'] = this.editStyle['openEdit'] = true;
    this.editStyle['closeEdit'] = this.editStyle['closeEdit'] = false;
    this.detailStyle['closeDetail'] = this.detailStyle['closeDetail'] = true;
    this.detailStyle['openDetail'] = this.detailStyle['openDetail'] = false;
    this.editForm.setValue({
      title: this.currentTask.title,
      dueDate: this.currentTask.dueDate,
      description: this.currentTask.description,
      completed: this.currentTask.completed
    })
  }
  
  closeTaskCard(){
    this.popupStyle['openPopup'] = this.popupStyle['openPopup'] = false;
    this.blockStyle['block'] = this.blockStyle['block'] = false;
    this.editStyle['openEdit'] = this.editStyle['openEdit'] = false;
    this.editStyle['closeEdit'] = this.editStyle['closeEdit'] = true;
    this.detailStyle['closeDetail'] = this.detailStyle['closeDetail'] = false;
    this.detailStyle['openDetail'] = this.detailStyle['openDetail'] = false;
  }

  taskComplete(id: Number){
  
    if(this.currentTask.completed){
      this.currentTask.completed = false;
    }
    if(!this.currentTask.completed){
      this.currentTask.completed = true;
    }
    console.log(this.currentTask);
    this.taskService.taskComplete(id, this.currentTask).subscribe(response => {
      console.log(response);
    });
  }

  editTask(id: Number, task){
    task['id'] = id;
    this.taskService.editTask(id, task).subscribe(response => {
      console.log(response);
    });
    window.location.reload();
  }

  deleteTask(id: Number){
    console.log(id)
    this.taskService.deleteTask(id).subscribe(response => {
      console.log(response);
    })
    window.location.reload();
  }

}