import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRegister } from 'src/app/model/user-register';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  userSub = new Subscription();

  constructor(private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  backToLogin() {
    this.route.navigate(['']);
  }

  onSubmit(form: NgForm) {
    const user = form.value;
    let password = form.control.get('password')?.value;
    let repeatpass = form.control.get('repeatpassword')?.value;
    if (password.length === repeatpass.length) {
      this.createUser(user);
      form.reset();
    } else {
      console.log('Passwords are not the same.');
    }
  }

  createUser(userReg: UserRegister) {
    this.authService.signup(userReg);
  }
}
