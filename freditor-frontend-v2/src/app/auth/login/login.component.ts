import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  displayProgressSpinner = false;

  constructor(private router: Router, private formBuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      'username': [null, [Validators.required]],
      'password': [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  submitForm(form: any) {
    this.displayProgressSpinner = true;
    this.authService.login(form);
    setTimeout(() => {
      this.displayProgressSpinner = false;
    }, 2000);
  }

  onSignup() {
    this.router.navigate(['signup']);
  }
}
