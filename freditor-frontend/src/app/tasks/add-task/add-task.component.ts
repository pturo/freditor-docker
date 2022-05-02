import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @ViewChild('TaskElements') taskElement!: ElementRef;
  @ViewChild('date') date!: ElementRef;
  addTaskForm?: any;
  listOfItems: any = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private taskService: TaskService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.addTaskForm = this.formBuilder.group({
      TaskTitle: new FormControl(['', [Validators.required]]).setValue(''),
      TaskElements: new FormControl([], Validators.required).setValue(''),
      TaskDeadline: new FormControl('', [Validators.required]).setValue('')
    });

    this.addTaskForm.controls['TaskElements'].setValue('* ');
  }

  dateChangeHandler(date: Date) {
    const stringDate: string = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    this.addTaskForm.get('TaskDeadline').setValue(stringDate);
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

  get f() {
    return this.addTaskForm.controls;
  }

  // Add task
  addTask() {
    const addTask = this.addTaskForm.value;
    let newTask: Task = {
      TaskTitle: addTask.TaskTitle,
      TaskElements: this.listOfItems,
      TaskDeadline: this.date.nativeElement.value
    };

    console.log('newTask: ', newTask);

    if (this.addTaskForm.valid) {
      this.taskService.addTask(newTask).subscribe((res) => {
        console.log('Pomyslnie dodano zadanie do bazy!')
      }, (err: any) => {
      });
      this.router.navigate(['tasks']);
    }
    else {
      console.log('Nie udalo sie zapisac zadania pomyslnie!');
    }
  }

  // Back to tasks
  backToTasks() {
    this.router.navigate(['tasks']);
  }
}
