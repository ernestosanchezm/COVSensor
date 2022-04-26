import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from 'src/app/edit-modal/edit-modal.component';
import { AirbombService } from 'src/app/services/airbomb.service';

@Component({
  selector: 'app-update-air',
  templateUrl: './update-air.component.html',
  styleUrls: ['./update-air.component.scss'],
})
export class UpdateAirComponent implements OnInit {
  form: FormGroup;

  data = {
    descripcion: '',
    asignado: false,
  };

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private dialog: MatDialog,
    private airBombService: AirbombService
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
      description: ['', [Validators.required]],
      status: [false, Validators.requiredTrue],
    });
  }

  get descriptionField() {
    return this.form.get('description');
  }

  get statusField() {
    return this.form.get('status');
  }

  goToBack() {
    this.location.back();
  }

  openDialog() {
    const airBombData = {
      ...this.form.value,
      status: this.form.value.status ? 'Asignado' : 'No Asignado',
    };
    // console.log(airBombData);
    this.airBombService.updateAirBomb(airBombData).subscribe((data) => {
      console.log(data);
    });
    this.dialog.open(EditModalComponent, {
      data: {
        titulo: 'Bomba de aire actualizada correctamente',
      },
    });
  }
}
