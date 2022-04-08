import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  form: FormGroup;

  data = {
    name: 'Jorge Miguel',
    lastName: 'Curi Huaman',
    email: 'jorgeHuaman@gmail.com',
    password: 'password'
  }

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
    this.form.patchValue(this.data);
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  get nameField(){
    return this.form.get('name');
  }

  get lastNameField(){
    return this.form.get('lastName');
  }

  get emailField(){
    return this.form.get('email');
  }

  get passwordField(){
    return this.form.get('password');
  }
}
