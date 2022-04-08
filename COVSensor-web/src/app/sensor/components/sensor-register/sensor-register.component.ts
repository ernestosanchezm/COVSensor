import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateComponent } from 'src/app/user/components/dialog-update/dialog-update.component';

@Component({
  selector: 'app-sensor-register',
  templateUrl: './sensor-register.component.html',
  styleUrls: ['./sensor-register.component.scss'],
})
export class SensorRegisterComponent implements OnInit {
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
      codigoEspacioCerrado: ['', Validators.required],
      estado: ['', Validators.requiredTrue],
      descripcion: ['', [Validators.required]],
    });
  }

  get descripcionField() {
    return this.formControl.get('descripcion');
  }

  get estadoField() {
    return this.formControl.get('estado');
  }

  get codigoEspacioCerradoField() {
    return this.formControl.get('codigoEspacioCerrado');
  }

  goToBack() {
    this.location.back();
  }

  openDialog() {
    this.matDialog.open(DialogUpdateComponent);
  }
}
