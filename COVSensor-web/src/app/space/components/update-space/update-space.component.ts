import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from 'src/app/edit-modal/edit-modal.component';
import { ClosedspaceService } from 'src/app/services/closedspace.service';
import { SensorService } from 'src/app/services/sensor.service';

@Component({
  selector: 'app-update-space',
  templateUrl: './update-space.component.html',
  styleUrls: ['./update-space.component.scss'],
})
export class UpdateSpaceComponent implements OnInit {
  form: FormGroup;

  sensores = [];

  data: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private dialog: MatDialog,
    private sensorService: SensorService,
    private closedSpaceService: ClosedspaceService
  ) {
    this.sensorService.getSensors().subscribe((res) => {
      this.sensores = res.map((sensor) => sensor.id_Arduino);
    });
    this.buildForm();
    const { id_Arduino, ...rest } = history.state;
    this.data = {
      ...rest,
      mySensor: history.state.id_Arduino,
    };
    this.form.patchValue(this.data);
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      codigo: [''],
      mySensor: ['', Validators.required],
    });
  }

  get descripcionField() {
    return this.form.get('descripcion');
  }

  get codigoField() {
    return this.form.get('codigo');
  }

  get mySensorField() {
    return this.form.get('mySensor');
  }

  goToBack() {
    this.location.back();
  }

  openDialog() {
    const closedSpaceData = {
      _id: this.data._id,
      codigo: this.form.value.codigo,
      description: this.form.value.descripcion,
      id_Arduino: this.form.value.mySensor,
    };
    this.closedSpaceService
      .updateClosedspace(closedSpaceData)
      .subscribe((res) => {
        this.dialog.open(EditModalComponent, {
          data: {
            titulo: 'Espacio cerrado actualizado correctamente',
          },
        });
      });
  }
}
