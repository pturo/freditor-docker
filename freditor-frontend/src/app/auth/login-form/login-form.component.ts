import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../../model/user-login';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  onSubmit(form: NgForm) {
    const loginUser = form.value;
    this.login(loginUser);
  }

  login(userlogin: UserLogin) {
    this.authService.login(userlogin);
  }
}
