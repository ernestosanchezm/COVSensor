import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from 'src/app/edit-modal/edit-modal.component';
import { AlarmService } from 'src/app/services/alarm.service';

@Component({
  selector: 'app-update-alarm',
  templateUrl: './update-alarm.component.html',
  styleUrls: ['./update-alarm.component.scss'],
})
export class UpdateAlarmComponent implements OnInit {
  form: FormGroup;

  data = {
    descripcion: '',
    asignado: false,
  };

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private dialog: MatDialog,
    private alarmService: AlarmService
  ) {
    this.buildForm();
    const { navigationId, ...rest } = history.state;
    this.data = {
      ...rest,
      status: rest.status === 'Asignado' ? true : false,
    };
    this.form.patchValue(this.data);
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      _id: [''],
      id_Arduino: [''],
      descripcion: ['', [Validators.required]],
      asignado: [false, Validators.requiredTrue],
    });
  }

  get descripcionField() {
    return this.form.get('descripcion');
  }

  get estadoField() {
    return this.form.get('estado');
  }

  goToBack() {
    this.location.back();
  }

  openDialog() {
    const { descripcion, asignado, ...rest } = this.form.value;
    const alarm = {
      ...rest,
      description: descripcion,
      status: asignado ? 'Asignado' : 'No Asignado',
    };
    this.alarmService.updateAlarms(alarm).subscribe((res) => {
      if (res) {
        this.dialog.open(EditModalComponent, {
          data: {
            titulo: 'Alarma actualizada correctamente',
          },
        });
      }
    });
  }
}
