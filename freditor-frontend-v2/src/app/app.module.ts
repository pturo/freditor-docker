import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { MaterialModule } from './material.module';
import { StyleManagerService } from './services/style-manager.service';
import { ThemeService } from './services/theme.service';
import { ThemeComponent } from './theme/theme.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ThemeComponent,
    HeaderComponent,
    SignupComponent
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [ThemeService, StyleManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
