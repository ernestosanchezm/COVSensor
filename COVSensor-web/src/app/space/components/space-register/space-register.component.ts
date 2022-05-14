import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from 'src/app/edit-modal/edit-modal.component';
import { DialogUpdateComponent } from 'src/app/user/components/dialog-update/dialog-update.component';

@Component({
  selector: 'app-space-register',
  templateUrl: './space-register.component.html',
  styleUrls: ['./space-register.component.scss'],
})
export class SpaceRegisterComponent implements OnInit {
  formControl: FormGroup;

  sensores: string[] = ['S-1', 'S-2', 'S-3'];

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
      asignado: [false, Validators.requiredTrue],
      codigo: ['', Validators.required],
      mySensor: ['', Validators.required],
    });
  }

  get descripcionField() {
    return this.formControl.get('descripcion');
  }

  get asignadoField() {
    return this.formControl.get('asignado');
  }

  get codigoField() {
    return this.formControl.get('codigo');
  }

  get mySensorField() {
    return this.formControl.get('mySensor');
  }

  goToBack() {
    this.location.back();
  }

  openDialog() {
    this.matDialog.open(EditModalComponent, {
      data: {
        titulo: 'Espacio cerrado se ha creado correctamente',
      },
    });
  }
}
