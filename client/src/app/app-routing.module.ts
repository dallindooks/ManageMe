import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectPageComponent } from './project/project-page/project-page.component';

const routes: Routes = [
  {path: 'project-list', component: ProjectListComponent},
  {path: '', component: ProjectListComponent},
  {path: 'project-create', component: ProjectCreateComponent},
  {path: 'project-page/:projectId', component: ProjectPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ProjectCreateComponent, ProjectListComponent]