import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  addNoteForm!: FormGroup;
  title: string = '';
  content: string = '';

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddNoteComponent>) { }

  ngOnInit(): void {
    this.addNoteForm = this.formBuilder.group(
      {
        title: [this.title, Validators.required],
        content: [this.content, Validators.required],
      }
    );
  }

  save() {
    this.dialogRef.close(this.addNoteForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
