import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/task';
import * as M from 'materialize-css';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit, AfterViewInit {
  addTaskForm?: any;
  @ViewChild('TaskElements') taskElement: any;
  listOfItems: any = [];
  taskList: Task[] = [];
  // pipe?: DatePipe = new DatePipe('en-US');
  // myDate: number = Date.now();
  // myFormattedDate: any = this.pipe?.transform(this.myDate, 'mediumDate');

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addTaskForm = this.formBuilder.group({
      TaskTitle: new FormControl(['', [Validators.required, Validators.minLength(8)]]).setValue(''),
      TaskElements: new FormControl([[], [Validators.required]]).setValue(''),
      TaskDeadline: new FormControl('', [Validators.required])
    });
  }

  ngAfterViewInit(): void {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.date');
      var instances = M.Datepicker.init(elems);
    });
  }

  addTask() {
    const addTask = this.addTaskForm?.value;
    let newTask: Task = {
      TaskTitle: addTask.TaskTitle,
      TaskElements: this.listOfItems,
      TaskDeadline: this.addTaskForm.get('TaskDeadline').value
    };

    if (newTask.TaskTitle != null && newTask.TaskElements != null && newTask.TaskDeadline != null) {
      this.taskList.push(newTask);
      //this.router.navigate(['tasks']);
    }
    else {
      console.log('Nie udalo sie zapisac zadania pomyslnie!');
    }

    console.log('Nowe zadanie', newTask);
  }

  backToTasks() {
    this.router.navigate(['tasks']);
  }

  addToList(event: any) {
    let val = event.target.value;
    this.listOfItems?.push(val);
    this.taskElement.nativeElement.value = '';
  }
}
