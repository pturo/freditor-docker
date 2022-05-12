import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit, OnDestroy {
  noteSub = new Subscription();
  editNoteForm!: any;
  noteId!: number;
  note: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.initValuesIntoForm();
  }

  buildForm() {
    this.editNoteForm = this.formBuilder.group({
      NoteId: new FormControl(''),
      NoteTitle: new FormControl(['', [Validators.required]]).setValue(''),
      NoteContent: new FormControl(['', [Validators.required]]).setValue(''),
    });
  }

  initValuesIntoForm() {
    this.noteId = this.route.snapshot.params['noteId'];

    this.noteSub = this.noteService.getNote(this.noteId).subscribe((res: any) => {
      setTimeout(() => {
        this.note = res.getNote;
      }, 0);
      console.log('res ', res.getNote);
      this.editNoteForm.patchValue(this.note);
    });
  }

  get f() {
    return this.editNoteForm.controls;
  }

  // Note edit operation.
  editNote() {
    const editForm = this.editNoteForm.value;
    this.noteSub = this.noteService.editNote(this.noteId, editForm).subscribe((res) => {
      this.router.navigate(['notes']);
    });
  }

  // Route to notes and unsubscribe.
  backToNotes() {
    this.router.navigate(['notes']);
  }

  ngOnDestroy(): void {
    this.noteSub.unsubscribe();
  }
}
