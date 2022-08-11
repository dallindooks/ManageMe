import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }
  @Input() tasks;
  baseUrl = environment.apiUrl;

  taskComplete(id, currentTask): Observable<Object>{
     return this.httpClient.put(this.baseUrl + 'api/Tasks/' + id, currentTask);
  }

  editTask(id, currentTask): Observable<Object>{
    return this.httpClient.put(this.baseUrl + 'api/Tasks/' + id, currentTask);
  }

  deleteTask(id): Observable<Object>{
    return this.httpClient.delete( this.baseUrl + 'api/Tasks/taskId?taskId=' + id);
  }
}
