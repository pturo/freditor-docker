import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddNoteComponent } from '../add-note/add-note.component';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  editNoteForm!: FormGroup;
  title: string = '';
  content: string = '';

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddNoteComponent>) { }

  ngOnInit(): void {
    this.editNoteForm = this.formBuilder.group(
      {
        title: [this.title, Validators.required],
        content: [this.content, Validators.required],
      }
    );
  }

  save() {
    this.dialogRef.close(this.editNoteForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }

}
