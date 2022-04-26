import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from 'src/app/edit-modal/edit-modal.component';
import { ClosedspaceService } from 'src/app/services/closedspace.service';
import { SensorService } from 'src/app/services/sensor.service';

@Component({
  selector: 'app-update-sensor',
  templateUrl: './update-sensor.component.html',
  styleUrls: ['./update-sensor.component.scss'],
})
export class UpdateSensorComponent implements OnInit {
  form: FormGroup;

  spaces = [];

  data = {};

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    public dialog: MatDialog,
    private sensorService: SensorService,
    private closedspaceService: ClosedspaceService
  ) {
    this.buildForm();
    const { navigationId, ...rest } = history.state;
    this.data = {
      ...rest,
      status: rest.status === 'Asignado' ? true : false,
    };
    this.form.patchValue(this.data);
    this.closedspaceService.getClosedspace().subscribe((data) => {
      this.spaces = data.map((d: any) => d._id);
    });
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      _id: [''],
      id_Arduino: [''],
      description: ['', [Validators.required]],
      status: [false, Validators.requiredTrue],
      codigoEspacioCerrado: ['', Validators.required],
    });
  }

  get descriptionField() {
    return this.form.get('description');
  }

  get id_ArduinoField() {
    return this.form.get('id_Arduino');
  }

  get statusField() {
    return this.form.get('status');
  }

  get codigoEspacioCerradoField() {
    return this.form.get('codigoEspacioCerrado');
  }

  openDialog() {
    const sensorData = {
      ...this.form.value,
      status: this.form.value.status ? 'Asignado' : 'No Asignado',
    };
    // console.log(sensorData);
    this.sensorService.updateSensor(sensorData).subscribe((data) => {
      console.log(data);
    });
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
