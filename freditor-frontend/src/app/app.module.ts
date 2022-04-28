import { forwardRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ValidateEqualModule } from 'ng-validate-equal';
import { TasksComponent } from './tasks/tasks.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { NotesComponent } from './notes/notes.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { EditorComponent } from './editor/editor.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ArchiveComponent } from './archive/archive.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { EditNoteComponent } from './notes/edit-note/edit-note.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginFormComponent,
    RegisterFormComponent,
    PageNotFoundComponent,
    HomeComponent,
    DashboardComponent,
    SideMenuComponent,
    TasksComponent,
    PlaceholderComponent,
    AddTaskComponent,
    EntertainmentComponent,
    NotesComponent,
    AddNoteComponent,
    EditorComponent,
    CalendarComponent,
    ArchiveComponent,
    EditNoteComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ValidateEqualModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
