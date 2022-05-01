import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Color, ScaleType } from '@swimlane/ngx-charts';

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

  view: [number, number] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Hora';
  yAxisLabel: string = 'Concentracion PPM';
  timeline: boolean = true;

  colorScheme: Color = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
  };

  constructor() {
    this.form = new FormGroup({
      myBomba: this.myBomba,
    });
  }

  multi = [
    {
      name: 'USA',
      series: [
        {
          name: '1990',
          value: 250000000,
        },
        {
          name: '2010',
          value: 309000000,
        },
        {
          name: '2011',
          value: 311000000,
        },
      ],
    },
  ];

  ngOnInit(): void {}

  onSelect(event) {
    console.log(event);
  }
}
