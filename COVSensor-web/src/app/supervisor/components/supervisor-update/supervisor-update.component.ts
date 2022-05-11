import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EditModalComponent } from 'src/app/edit-modal/edit-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-supervisor-update',
  templateUrl: './supervisor-update.component.html',
  styleUrls: ['./supervisor-update.component.scss'],
})
export class SupervisorUpdateComponent implements OnInit {
  form: FormGroup;

  data = {};

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.buildForm();
    let { navigationId, ...rest } = history.state;
    this.data = { ...rest };
    this.form.patchValue(this.data);
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
    const updateSupervisorData = {
      ...this.data,
      ...this.form.value,
    };
    this.authService.updateSupervisor(updateSupervisorData).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.error(err);
      }
    );
    this.dialog.open(EditModalComponent, {
      data: {
        titulo: 'Cuenta actualizada correctamente',
      },
    });
  }
}
