import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/model/user-register';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  data = false;
  userForm: any;
  message?: string;

  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  backToLogin() {
    this.route.navigate(['']);
  }

  onSubmit(form: NgForm) {
    const user = form.value;
    this.createUser(user);
  }

  createUser(userReg: UserRegister) {
    this.loginService.register(userReg).subscribe(() => {
      this.data = true;
      this.message = 'User registered successfully.';
      this.userForm.reset();
    });
  }
}
