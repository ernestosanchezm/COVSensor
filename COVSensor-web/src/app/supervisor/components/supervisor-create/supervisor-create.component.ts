import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateComponent } from './../dialog-update/dialog-update.component';
import { AuthService } from 'src/app/services/auth.service';

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

  get eMailField() {
    return this.form.get('eMail');
  }

  get pswField() {
    return this.form.get('psw');
  }

  goToBack() {
    this.location.back();
  }

  openDialog() {
    const newSupervisorData = {
      ...this.form.value,
      userName: this.form.value.name,
    };
    this.authService.createSupervisor(newSupervisorData).subscribe((data) => {
      if (data) {
        console.log('Supervisor: ', data);
      }
    });
    this.matDialog.open(DialogUpdateComponent);
  }
}
