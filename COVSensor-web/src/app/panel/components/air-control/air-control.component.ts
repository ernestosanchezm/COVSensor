import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

const ELEMENT_DATA: any[] = [
  { codigoEspacioCerrado: 'E-1', codigoBombaAire: 'B-2', estatus: false },
];
@Component({
  selector: 'app-air-control',
  templateUrl: './air-control.component.html',
  styleUrls: ['./air-control.component.scss'],
})
export class AirControlComponent implements OnInit {
  form: FormGroup;

  bombasAire: string[] = ['Alabama', 'Alaska', 'Arizona'];
  myBomba = new FormControl('');

  displayedColumns: string[] = [
    'Codigo de espacio cerrado',
    'Codigo de bomba de aire',
    'Estatus',
  ];
  dataSource = ELEMENT_DATA;
  informeSelected = '';

  constructor() {
    this.form = new FormGroup({
      myBomba: this.myBomba,
    });
  }

  ngOnInit(): void {}
}
