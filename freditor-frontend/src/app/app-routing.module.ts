import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveComponent } from './archive/archive.component';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EditorComponent } from './editor/editor.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupFormComponent },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule), canActivate: [AuthGuard] },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks-routing.module').then(m => m.TasksRoutingModule), canActivate: [AuthGuard] },
  { path: 'notes', loadChildren: () => import('./notes/notes-routing.module').then(m => m.NotesRoutingModule), canActivate: [AuthGuard] },
  { path: 'editor', component: EditorComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'archive', component: ArchiveComponent, canActivate: [AuthGuard] },
  { path: 'entertainment', component: EntertainmentComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
