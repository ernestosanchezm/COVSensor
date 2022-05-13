import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  // nombre = 'Jorge@hmfk.com';
  // hideRequired = true;
  wrongCredentials = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private location: Location,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  login() {
    const userData = {
      eMail: this.form.value.email,
      psw: this.form.value.password,
    };
    this.authService.loginUser(userData).subscribe(
      (data) => {
        console.log(data)
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('/');
      },
      (err) => {
        if (err) {
          this.wrongCredentials = true;
          setTimeout(() => {
            this.wrongCredentials = false;
          }, 3000);
        }
      }
    );
  }
}
