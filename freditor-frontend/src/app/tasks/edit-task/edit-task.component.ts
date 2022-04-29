import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  @ViewChild('TaskElements') taskElement: any;
  taskSub = new Subscription();
  editTaskForm?: any;
  taskId!: number;
  listOfItems: any = [];
  task: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private taskService: TaskService, private formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.buildForm();
    this.initValuesIntoForm();
  }

  buildForm() {
    this.editTaskForm = this.formBuilder.group({
      TaskId: new FormControl(''),
      TaskTitle: new FormControl(['', [Validators.required]]).setValue(''),
      TaskElements: new FormControl([], Validators.required).setValue(''),
      TaskDeadline: new FormControl('', [Validators.required]).setValue('')
    });

    this.editTaskForm.controls['TaskElements'].setValue('* ');
  }

  initValuesIntoForm() {
    this.taskId = this.route.snapshot.params['taskId'];

    this.taskSub = this.taskService.getTask(this.taskId).subscribe((res: any) => {
      setTimeout(() => {
        this.task = res.getTask;
        this.listOfItems = res.getTask.taskElements;
      }, 0);
      console.log('res ', res.getNote);
      this.editTaskForm.patchValue(this.task);
    });
  }

  get f() {
    return this.editTaskForm.controls;
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

  // Task edit operation
  editTask() {
    const editTask = this.editTaskForm.value;
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
