import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveComponent } from './archive/archive.component';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { EditNoteComponent } from './notes/edit-note/edit-note.component';
import { NotesComponent } from './notes/notes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupFormComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks-routing.module').then(m => m.TasksRoutingModule), canActivate: [AuthGuard] },
  { path: 'notes', component: NotesComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'notes/add-note', component: AddNoteComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'notes/edit-note/:noteId', component: EditNoteComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'editor', component: EditorComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'archive', component: ArchiveComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'entertainment', component: EntertainmentComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
