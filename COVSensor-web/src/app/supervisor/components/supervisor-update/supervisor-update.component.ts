import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EditModalComponent } from 'src/app/edit-modal/edit-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-supervisor-update',
  templateUrl: './supervisor-update.component.html',
  styleUrls: ['./supervisor-update.component.scss'],
})
export class SupervisorUpdateComponent implements OnInit {
  form: FormGroup;

  data = {
    name: '',
    lastName: '',
    email: '',
    password: 'password',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.buildForm();
    this.data = {
      name: history.state.nombre,
      email: history.state.correo,
      lastName: history.state.apellido,
      password: 'password',
    };
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
    this.dialog.open(EditModalComponent, {
      data: {
        titulo: 'Cuenta actualizada correctamente',
      },
    });
  }
}
