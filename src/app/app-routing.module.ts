import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';
import { LeavePageGuard } from './core/guards/leave-page.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'todo/edit/:id',
    component: TodoFormComponent,
    canDeactivate: [LeavePageGuard]
  },
  {
    path: 'todo/add',
    component: TodoFormComponent,
    canDeactivate: [LeavePageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
