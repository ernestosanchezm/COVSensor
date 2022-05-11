import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateComponent } from './../dialog-update/dialog-update.component';
import { AuthService } from 'src/app/services/auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  form: FormGroup;

  data = {};

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {
    this.buildForm();
    const user = localStorage.getItem('userName');
    const username: any = jwtDecode(user);
    this.authService.getUser(username.username).subscribe(
      (data) => {
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

  openDialog() {
    const updateUserData = {
      ...history.state,
      ...this.form.value,
    };
    if (updateUserData.isAdmin) {
      this.authService.updateAdmin(updateUserData).subscribe((data) => {
        if (data) {
          console.log(data);
        }
      });
    } else {
      this.authService.updateSupervisor(updateUserData).subscribe((data) => {
        if (data) {
          console.log(data);
        }
      });
    }
    this.matDialog.open(DialogUpdateComponent);
  }
}
