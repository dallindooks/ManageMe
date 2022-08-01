import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';

@Injectable({
    providedIn: 'root'
  })

  export class ProjectService {
    projects: Project[];
     
    constructor(private httpClient: HttpClient) { }
    
    getProjects(){
        this.httpClient.get<any>('https://localhost:7261/api/Project').subscribe(
            response => {
                console.log(response);
                this.projects = response;
            }
        )
      }
    
  }