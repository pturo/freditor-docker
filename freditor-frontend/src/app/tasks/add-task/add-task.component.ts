import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  listOfItems: any = [];

  constructor(private router: Router, private taskService: TaskService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
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

  // Add task
  addTask(form: NgForm) {
    const addTask = form.value;
    let newTask: Task = {
      TaskTitle: addTask.tasktitle,
      TaskElements: this.listOfItems,
      TaskDeadline: addTask.deadline
    };

    console.log('newTask: ', newTask);

    if (form.valid) {
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
