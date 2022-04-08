import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { EditModalComponent } from 'src/app/edit-modal/edit-modal.component';

@Component({
  selector: 'app-update-sensor',
  templateUrl: './update-sensor.component.html',
  styleUrls: ['./update-sensor.component.scss'],
})
export class UpdateSensorComponent implements OnInit {
  form: FormGroup;

  data = {
    descripcion: '',
    estado: false,
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
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
      estado: ['', Validators.requiredTrue],
    });
  }

  get descripcionField() {
    return this.form.get('descripcion');
  }

  get estadoField() {
    return this.form.get('estado');
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
