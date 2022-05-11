import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from 'src/app/edit-modal/edit-modal.component';
import { ClosedspaceService } from 'src/app/services/closedspace.service';
import { SensorService } from 'src/app/services/sensor.service';
import { DialogUpdateComponent } from 'src/app/user/components/dialog-update/dialog-update.component';

@Component({
  selector: 'app-space-register',
  templateUrl: './space-register.component.html',
  styleUrls: ['./space-register.component.scss'],
})
export class SpaceRegisterComponent implements OnInit {
  formControl: FormGroup;

  sensores = [];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private matDialog: MatDialog,
    private closedSpaceService: ClosedspaceService,
    private sensorService: SensorService
  ) {
    this.sensorService.getSensors().subscribe((res) => {
      this.sensores = res.map((sensor) => sensor.id_Arduino);
    });
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.formControl = this.formBuilder.group({
      description: ['', [Validators.required]],
      codigo: ['', Validators.required],
      mySensor: ['', Validators.required],
    });
  }

  get descriptionField() {
    return this.formControl.get('description');
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
    const closedSpaceData = {
      id_Arduino: this.formControl.value.mySensor,
      codigo: this.formControl.value.codigo,
      description: this.formControl.value.description,
    };
    this.closedSpaceService
      .createClosedspace(closedSpaceData)
      .subscribe((res) => {
        this.matDialog.open(EditModalComponent, {
          data: {
            titulo: 'Espacio cerrado se ha creado correctamente',
          },
        });
      });
  }
}
