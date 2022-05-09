import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {
  pipe?: DatePipe = new DatePipe('en-US');
  myDate: number = Date.now();
  myFormattedDate: any = this.pipe?.transform(this.myDate, 'short');
  tasks: any = [];
  progVal = 0;
  subService = new Subscription();

  constructor(private router: Router, private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getTasks();
  }

  updateProgressBar(e: any, task: any, taskId: number) {
    let isChecked = false;
    if (e.checked && (task.taskId === taskId)) {
      isChecked = true;
      this.progVal += 25;
      console.log(isChecked);
      console.log(this.progVal);
    }
    if (!e.checked && (task.taskId === taskId)) {
      isChecked = false;
      this.progVal -= 25;
      console.log(isChecked);
      console.log(this.progVal);
    }
    isChecked = false;
  }

  // Task CRUD operations
  getTasks() {
    this.subService = this.taskService.getTasks().subscribe((res: any) => {
      setTimeout(() => {
        this.tasks = res.getTasks;
      }, 0);
    });
  }

  deleteTask(taskId: number) {
    this.subService = this.taskService.deleteTask(taskId).subscribe((res) => {
      this.tasks = this.tasks.filter((item: any) => item.taskId !== taskId);
    });
  }

  // Route to add-task, edit-task and unsubscribe
  goToAddTask() {
    this.router.navigate(['tasks/add-task']);
  }

  goToEditTask(taskId: number) {
    this.router.navigate(['tasks/edit-task/' + taskId]);
  }

  ngOnDestroy(): void {
    this.subService.unsubscribe();
  }
}
