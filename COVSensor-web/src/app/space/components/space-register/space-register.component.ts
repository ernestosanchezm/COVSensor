import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateComponent } from 'src/app/user/components/dialog-update/dialog-update.component';

@Component({
  selector: 'app-space-register',
  templateUrl: './space-register.component.html',
  styleUrls: ['./space-register.component.scss'],
})
export class SpaceRegisterComponent implements OnInit {
  formControl: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private matDialog: MatDialog
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.formControl = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      estado: ['', Validators.requiredTrue],
    });
  }

  get descripcionField() {
    return this.formControl.get('descripcion');
  }

  get estadoField() {
    return this.formControl.get('estado');
  }

  goToBack() {
    this.location.back();
  }

  openDialog() {
    this.matDialog.open(DialogUpdateComponent);
  }
}
