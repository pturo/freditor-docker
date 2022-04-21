import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/task';
import * as M from 'materialize-css';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit, AfterViewInit {
  addTaskForm?: any;
  @ViewChild('TaskElements') taskElement: any;
  taskVal?: string;
  listOfItems: any = [];
  taskList: Task[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.addTaskForm = this.formBuilder.group({
      TaskTitle: new FormControl(['', [Validators.required, Validators.minLength(8)]]).setValue(''),
      TaskElements: new FormControl(null, Validators.required).setValue(''),
      TaskDeadline: new FormControl('', [Validators.required]).setValue('')
    });
  }

  validateInput() {
    let taskVal = this.addTaskForm.controls['TaskElements'];

    taskVal.valueChanges.subscribe(() => {
      if (taskVal.value == '') {
        taskVal.clearValidators();
      } else {
        taskVal.setValidators();
      }
      taskVal.updateValueAndValidity({ emitEvent: false });
    });
  }

  ngAfterViewInit(): void {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.date');
      var instances = M.Datepicker.init(elems);
    });
  }

  addTask() {
    const addTask = this.addTaskForm.value;
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

  addToList(event: any) {
    let val = event.target.value;
    if (val == '' && this.listOfItems.length == 0) {
      console.log('Nie wolno umieszczac pustej wartosci!');
    }

    if (val != '') {
      this.listOfItems?.push(val);
    }
    this.taskElement.nativeElement.value = '';
  }

  backToTasks() {
    this.router.navigate(['tasks']);
  }
}
