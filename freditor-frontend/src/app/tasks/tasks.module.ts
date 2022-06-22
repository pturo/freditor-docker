import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TasksComponent,
    AddTaskComponent,
    EditTaskComponent,
    TasksListComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    MaterialModule
  ],
  exports: [TasksComponent]
})
export class TasksModule { }
