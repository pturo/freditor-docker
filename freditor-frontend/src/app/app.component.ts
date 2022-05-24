import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  isAuth = false;
  opened = true;
  authSub!: Subscription;

  constructor(private router: Router, private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.authSub = this.loginService.authChange.subscribe(authResult => {
      this.isAuth = authResult;
    });
  }

  logout() {
    this.loginService.logout();
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
