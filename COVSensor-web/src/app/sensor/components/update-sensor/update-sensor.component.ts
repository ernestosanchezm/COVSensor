import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from 'src/app/edit-modal/edit-modal.component';

@Component({
  selector: 'app-update-sensor',
  templateUrl: './update-sensor.component.html',
  styleUrls: ['./update-sensor.component.scss'],
})
export class UpdateSensorComponent implements OnInit {
  form: FormGroup;

  spaces: string[] = ['A-1', 'B-2', 'C-1'];

  data = {
    descripcion: '',
    asignado: false,
  };

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    public dialog: MatDialog
  ) {
    this.buildForm();
    this.data = {
      ...history.state,
    };
    this.form.patchValue(this.data);
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      asignado: [false, Validators.requiredTrue],
      codigoEspacioCerrado: ['', Validators.required],
    });
  }

  get descripcionField() {
    return this.form.get('descripcion');
  }

  get estadoField() {
    return this.form.get('estado');
  }

  get codigoEspacioCerradoField() {
    return this.form.get('codigoEspacioCerrado');
  }

  openDialog() {
    this.dialog.open(EditModalComponent, {
      data: {
        titulo: 'Sensor de CO2 actualizado correctamente',
      },
    });
  }

  goToBack() {
    this.location.back();
  }
}
