import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })

  export class ProjectService {
    projects: Project;
     
    constructor(private httpClient: HttpClient, private router: Router) { }
    
    getProjects() : Observable<Project[]>{
       return this.httpClient.get<Project[]>('https://localhost:7261/api/Project');
      }

      deleteProject(id) : Observable<Project>{
        return this.httpClient.delete<Project>('https://localhost:7261/api/Project/projectId?projectId=' + id);
      }
    
  }