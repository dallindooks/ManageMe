import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/projectService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  projects: Project[];
  baseUrl = environment.apiUrl;
  
  constructor(
    private httpCLient: HttpClient, 
    private router: Router,
    private projectService: ProjectService
    ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((data: Project[]) => {
      console.log(data);
      this.projects = data;
    });
  }

  ProjectCreate(project: Project){
    console.log(project);
    this.httpCLient.post<Project>(this.baseUrl + 'api/Project', project)
      .subscribe((response) => {
        console.log(response);
      });
      this.router.navigate(['/project-list']);
  }

}
