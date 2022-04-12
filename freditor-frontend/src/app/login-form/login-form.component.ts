import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../model/user-login';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: any;
  errorMessage = '';

  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'UserName': new FormControl(['', Validators.required]).setValue(''),
      'Password': new FormControl(['', Validators.required]).setValue('')
    });
  }

  register() {
    this.router.navigate(['/register']);
  }

  ngOnFormSubmit() {
    const loginUser = this.loginForm.value;
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
        this.errorMessage = err;
        console.log(err);
      });
  }
}
