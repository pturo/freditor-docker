import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  editNoteForm!: FormGroup;
  noteId!: number;
  note: any;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private noteService: NoteService) { }

  ngOnInit(): void {
    this.buildForm();
    this.initValuesIntoForm();
  }

  initValuesIntoForm() {
    this.noteId = this.route.snapshot.params['noteId'];

    this.noteService.getNote(this.noteId).subscribe((res: any) => {
      this.note = res;
      this.editNoteForm.patchValue(this.note);
    });
  }

  buildForm() {
    this.editNoteForm = this.formBuilder.group({
      NoteTitle: ['', [Validators.required]],
      NoteContent: ['', [Validators.required]],
    });
  }

  editNote() {
    this.noteService.editNote(this.noteId, this.editNoteForm.value).subscribe(res => {
      this.router.navigate(['notes']);
    });
  }

  backToNotes() {
    this.router.navigate(['notes']);
  }

}
