import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { EditModalComponent } from 'src/app/edit-modal/edit-modal.component';

@Component({
  selector: 'app-update-space',
  templateUrl: './update-space.component.html',
  styleUrls: ['./update-space.component.scss'],
})
export class UpdateSpaceComponent implements OnInit {
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
    private dialog: MatDialog
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

  goToBack() {
    this.location.back();
  }

  openDialog() {
    this.dialog.open(EditModalComponent, {
      data: {
        titulo: 'Espacio cerrado actualizado correctamente',
      },
    });
  }
}
