import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  fullUser = {};

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
    const user = localStorage.getItem('token');
    const username: any = jwtDecode(user);
    this.authService.getUser(username.email).subscribe(
      (data) => {
        this.fullUser = data;
        this.form.patchValue(data);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      eMail: ['', [Validators.required, Validators.email]],
      psw: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get lastNameField() {
    return this.form.get('lastName');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  goToBack() {
    this.location.back();
  }

  logOut() {
    localStorage.removeItem('userName');
    this.router.navigateByUrl('/home');
  }

  goToDetail() {
    this.router.navigateByUrl('/user/update', { state: this.fullUser });
  }
}
