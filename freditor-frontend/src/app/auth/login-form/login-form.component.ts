import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../../model/user-login';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

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
    this.loginService.login(userlogin)
      .subscribe(res => {
        console.log(res);

        if (res.token) {
          sessionStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        }
      }, (err) => {
        console.log(err);
      });
  }
}
