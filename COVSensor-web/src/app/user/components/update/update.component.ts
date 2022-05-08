import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateComponent } from './../dialog-update/dialog-update.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private matDialog: MatDialog,
    private authService: AuthService
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
    this.authService.updateAdmin(this.form.value).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.error(err);
      }
    );
    this.matDialog.open(DialogUpdateComponent);
  }
}
