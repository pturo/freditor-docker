import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from '../model/user-register';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  data = false;
  userForm: any;
  message?: string;

  constructor(private route: Router, private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      UserName: new FormControl(['', [Validators.required, Validators.minLength(8)]]).setValue(''),
      Email: new FormControl(['', [Validators.required]]).setValue(''),
      Password: new FormControl(['', [Validators.required, Validators.minLength(8)]]).setValue(''),
      RepeatPassword: new FormControl(['', [Validators.required, Validators.minLength(8)]]).setValue('')
    });
  }

  backToLogin() {
    this.route.navigate(['']);
  }

  onFormSubmit() {
    const user = this.userForm.value;
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
