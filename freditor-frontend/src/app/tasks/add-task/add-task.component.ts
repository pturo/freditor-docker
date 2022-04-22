import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/task';
import * as M from 'materialize-css';
import { TaskService } from 'src/app/services/task.service';

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

  constructor(private router: Router, private formBuilder: FormBuilder, private taskService: TaskService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.addTaskForm = this.formBuilder.group({
      TaskTitle: new FormControl(['', [Validators.required]]).setValue(''),
      TaskElements: new FormControl([], Validators.required).setValue(''),
      TaskDeadline: new FormControl('', [Validators.required]).setValue('')
    });
  }

  ngAfterViewInit(): void {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.date');
      var instances = M.Datepicker.init(elems);
    });

    this.taskElement.nativeElement.value = '* ';
  }

  addTask() {
    const addTask = this.addTaskForm.value;
    let newTask: Task = {
      TaskTitle: addTask.TaskTitle,
      TaskElements: this.listOfItems,
      TaskDeadline: this.addTaskForm.get('TaskDeadline').value
    };

    if (this.addTaskForm.valid) {
      this.taskService.addTask(newTask).subscribe((res: any) => {
        console.log('Pomyslnie dodano zadanie do bazy!')
      }, (err: any) => {
        console.log('Blad: ', err);
      });
      this.router.navigate(['tasks']);

      console.log('Nowe zadanie', newTask);
    }
    else {
      console.log('Nie udalo sie zapisac zadania pomyslnie!');
    }
  }

  addToList(event: any) {
    let val = event.target.value;
    if (val == '' && this.listOfItems.length == 0) {
      console.log('Nie wolno umieszczac pustej wartosci!');
    }

    if (val != '') {
      this.listOfItems?.push(val);
    }
    this.taskElement.nativeElement.value = '* ';
  }

  backToTasks() {
    this.router.navigate(['tasks']);
  }
}
