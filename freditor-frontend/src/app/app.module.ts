import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { EditorComponent } from './editor/editor.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ArchiveComponent } from './archive/archive.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
import { AuthService } from './auth/auth-service/auth.service';
import { RouterModule } from '@angular/router';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginFormComponent,
    PageNotFoundComponent,
    HomeComponent,
    DashboardComponent,
    EntertainmentComponent,
    EditorComponent,
    CalendarComponent,
    ArchiveComponent,
    SignupFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MaterialModule,
    CanvasWhiteboardModule,
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
