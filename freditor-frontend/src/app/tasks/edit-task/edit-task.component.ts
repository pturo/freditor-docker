import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit, OnDestroy {
  taskSub = new Subscription();
  taskId!: number;
  listOfItems: any = [];
  task: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private taskService: TaskService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.initValuesIntoForm();
  }

  initValuesIntoForm() {
    this.taskId = this.route.snapshot.params['taskId'];

    this.taskSub = this.taskService.getTask(this.taskId).subscribe((res: any) => {
      setTimeout(() => {
        this.task = res.getTask;
        this.listOfItems = res.getTask.taskElements;
      }, 0);
      console.log('res ', res.getNote);
    });
  }

  addToList(event: any) {
    let val = event.target.value;
    if (val == '' && this.listOfItems.length == 0) {
      console.log('Nie wolno umieszczac pustej wartosci!');
    }

    if (val != '') {
      this.listOfItems?.push(val);
    }
  }

  deleteItem(item: any) {
    this.listOfItems.splice(item, 1);
  }

  // Task edit operation
  editTask(form: NgForm) {
    const editTask = form.value;
    this.taskSub = this.taskService.editTask(this.taskId, editTask).subscribe((res) => {
      this.router.navigate(['tasks']);
    });
  }

  // Route to tasks and unsubscribe
  backToTasks() {
    this.router.navigate(['tasks']);
  }

  ngOnDestroy(): void {
    this.taskSub.unsubscribe();
  }
}
