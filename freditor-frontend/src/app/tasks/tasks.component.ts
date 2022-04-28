import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  subService = new Subscription();
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private taskService: TaskService) {
    this.form = this.formBuilder.group({
      checkArray: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.getTasks();
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  // submit() {
  //   const selectedTaskElemId = this.form.value.checkboxes.map((checked: boolean, i: number) => checked ? this.tasks[i].TaskId : null)
  //     .filter((v: any) => v !== null);
  //   console.log(selectedTaskElemId);
  // }

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
