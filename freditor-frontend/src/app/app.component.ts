import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn: any;
  opened = true;

  constructor(private router: Router, private loginService: LoginService) {
    this.loggedIn = loginService.isLoggedIn;
  }

  ngOnInit(): void {
    // if (this.loggedIn) {
    //   this.router.navigate(['/dashboard']);
    // } else {
    //   this.router.navigate(['']);
    //   this.logout();
    // }
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
