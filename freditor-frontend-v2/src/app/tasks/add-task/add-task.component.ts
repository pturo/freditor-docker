import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @ViewChild('elemInput') elemInput: any;
  addTaskForm!: FormGroup;
  title: string = '';
  taskElements: string[] = [];
  date: string = '';
  listOfItems: string[] = [];

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddTaskComponent>) {
  }

  ngOnInit(): void {
    this.addTaskForm = this.formBuilder.group(
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
    this.dialogRef.close(this.addTaskForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }

}
