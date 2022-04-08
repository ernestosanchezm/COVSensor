import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-co2-control',
  templateUrl: './co2-control.component.html',
  styleUrls: ['./co2-control.component.scss'],
})
export class Co2ControlComponent implements OnInit {
  form: FormGroup;
  informeSelected = '';
  myBomba = new FormControl('');
  bombasAire: string[] = ['Alabama', 'Alaska', 'Arizona'];

  constructor() {
    this.form = new FormGroup({
      myBomba: this.myBomba,
    });
  }

  ngOnInit(): void {}
}
