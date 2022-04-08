import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateComponent } from './../dialog-update/dialog-update.component';

@Component({
  selector: 'app-supervisor-create',
  templateUrl: './supervisor-create.component.html',
  styleUrls: ['./supervisor-create.component.scss'],
})
export class SupervisorCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private matDialog: MatDialog
  ) {
    this.buildForm();
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

  openDialog() {
    this.matDialog.open(DialogUpdateComponent);
  }
}
