import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class ProjectService {
    baseUrl = environment.apiUrl;
    projects: Project;
     
    constructor(private httpClient: HttpClient, private router: Router) { }
    
    getProjects() : Observable<Project[]>{
       return this.httpClient.get<Project[]>(this.baseUrl + 'Project');
      }

      deleteProject(id) : Observable<Project>{
        return this.httpClient.delete<Project>(this.baseUrl + 'Project/projectId?projectId=' + id);
      }
    
  }