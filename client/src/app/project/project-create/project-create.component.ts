import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  
  constructor(private httpCLient: HttpClient) { }

  ngOnInit(): void {
  }

  ProjectCreate(project: Project){
    console.log(project);
    this.httpCLient.post<Project>('https://localhost:7261/api/Project', project)
      .subscribe((response) => {
        console.log(response);
      });
  }

}
