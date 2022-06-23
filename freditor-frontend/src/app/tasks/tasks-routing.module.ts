import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

export const TaskRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'add-task', component: AddTaskComponent, canActivate: [AuthGuard] },
      { path: 'edit-task/:taskId', component: EditTaskComponent, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(TaskRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class TasksRoutingModule { }
