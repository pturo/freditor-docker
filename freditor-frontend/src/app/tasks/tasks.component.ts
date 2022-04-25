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

  getTasks() {
    this.subService = this.taskService.getTasks().subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.tasks = Array.from(Object.values(res));
      }
    }, (err: any) => {
      console.log('Wystapil blad podczas pobierania danych: ', err);
    });
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

  ngOnInit(): void {
    this.getTasks();
  }

  // submit() {
  //   const selectedTaskElemId = this.form.value.checkboxes.map((checked: boolean, i: number) => checked ? this.tasks[i].TaskId : null)
  //     .filter((v: any) => v !== null);
  //   console.log(selectedTaskElemId);
  // }

  goToAddTask() {
    this.router.navigate(['tasks/add-task']);
  }

  ngOnDestroy(): void {
    this.subService.unsubscribe();
  }
}
