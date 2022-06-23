import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackBy } from '../optimization/track-by';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  pipe?: DatePipe = new DatePipe('en-US');
  myDate: number = Date.now();
  myFormattedDate: any = this.pipe?.transform(this.myDate, 'short');
  tasks: any[];

  constructor(private router: Router, private taskService: TaskService, public trackBy: TrackBy) {
    // this.tasks = [
    //   {
    //     taskId: 1,
    //     taskTitle: 'Task 111',
    //     taskElements: 'Yolo na bambolo, Co tam staruszku?',
    //     deadLine: '20/04/2022'
    //   },
    //   {
    //     taskId: 2,
    //     taskTitle: 'Task 232',
    //     taskElements: 'Nic nie działa, Zaraz to naprawię!',
    //     deadLine: '25/06/2022'
    //   },
    // ];
  }

  ngOnInit(): void {
  }

  // Task CRUD operations
  getTasks() {
    this.taskService.getTasks().subscribe((res: any) => {
      setTimeout(() => {
        this.tasks = res.getTasks;
      }, 0);
      console.log(res.getTasks);
    });
  }

  updateProgressBar(e: any) {
    // let progVal = 0;
    // let isChecked = false;
    // if (e.checked) {
    //   isChecked = true;
    //   progVal += (100 / 4);
    //   console.log(progVal);
    // }
    // if (!e.checked) {
    //   isChecked = false;
    //   progVal -= (100 / 4);
    //   console.log(progVal);
    // }
    // isChecked = false;
  }

  // Route to add-task, edit-task
  goToAddTask() {
    this.router.navigate(['tasks/add-task']);
  }

  goToEditTask(taskId: number) {
    this.router.navigate(['tasks/edit-task/' + taskId]);
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe((res) => {
      this.tasks = this.tasks.filter((item: any) => item.taskId !== taskId);
    });
  }
}
