import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  @ViewChild('elemInput') elemInput: any;
  editTaskForm!: FormGroup;
  title: string = '';
  taskElements: string[] = [];
  date: string = '';
  listOfItems: string[] = [];

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddTaskComponent>) {
  }

  ngOnInit(): void {
    this.editTaskForm = this.formBuilder.group(
      {
        title: [this.title, Validators.required],
        taskElements: [this.taskElements, Validators.required],
        date: [this.date, Validators.required]
      }
    );
  }

  addToList(event: any) {
    let val = event.target.value;
    if (val == '' && this.listOfItems.length == 0) {
      // do nothing
    }

    if (val != '') {
      this.listOfItems?.push(val);
    }

    this.elemInput.nativeElement.value = '';
  }

  save() {
    this.dialogRef.close(this.editTaskForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }

}
