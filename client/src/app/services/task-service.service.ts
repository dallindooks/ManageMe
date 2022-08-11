import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }
  @Input() tasks;

  taskComplete(id, currentTask): Observable<Object>{
     return this.httpClient.put('https://localhost:7261/api/Tasks/' + id, currentTask);
  }

  editTask(id, currentTask): Observable<Object>{
    return this.httpClient.put('https://localhost:7261/api/Tasks/' + id, currentTask);
  }

  deleteTask(id): Observable<Object>{
    return this.httpClient.delete('https://localhost:7261/api/Tasks/taskId?taskId=' + id);
  }
}
