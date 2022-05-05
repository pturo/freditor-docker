import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
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
  progressVal = 0;
  subService = new Subscription();

  constructor(private router: Router, private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getTasks();
  }

  updateProgressBar(e: MatCheckboxChange, taskId: number) {
    let checkArray = document.getElementsByTagName("mat-checkbox");
    for (let i = 0; i < checkArray.length; i++) {
      let id = parseInt(checkArray[i].id);
      console.log('id: ', id);
      if (id === taskId) {
        let newArr = checkArray[id];
        console.log('checkArray: ', newArr);
      }
    }

    // if (e.checked === true) {
    //   this.progressVal += (100 / checkedLength);
    // } else {
    //   this.progressVal -= (100 / checkedLength);
    // }
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
