import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ConcentrationService } from 'src/app/services/concentration.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-co2-control',
  templateUrl: './co2-control.component.html',
  styleUrls: ['./co2-control.component.scss'],
})
export class Co2ControlComponent implements OnInit {
  form: FormGroup;
  informeSelected = '';
  myBomba = new FormControl('');
  bombasAire: string[] = ['ES1'];
  actual;

  view: [number, number] = [700, 300];
  viewMultiDate: [number, number] = [1400, 400];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Segundo';
  yAxisLabel: string = 'Concentracion PPM';
  xAxisLabelMultiDate: string = '';
  yAxisLabelMultiDate: string = 'Concentracion PPM';
  timeline: boolean = true;

  colorScheme: Color = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
  };

  counter = 2;

  constructor(
    private socketService: SocketService,
    private concetrationService: ConcentrationService
  ) {
    this.form = new FormGroup({
      myBomba: this.myBomba,
    });
    this.multi = [
      {
        name: 'Data',
        series: this.initData(),
      },
    ];
    this.multiDate = [
      {
        name: 'Concentracion',
        series: [],
      },
    ];
    this.socketService.listenToServer('connect');
    this.socketService.listenToServer('metrics').subscribe((data) => {
      this.actual = data.metric;
      this.addData(data);
    });
  }

  multi = [];

  multiDate = [];

  ngOnInit(): void { }

  initData() {
    const array = [];
    for (let i = 0; i < 3; i++) {
      array.push({
        name: i.toString(),
        value: 0,
      });
    }
    return array;
  }

  addData(data: any) {
    this.counter++;

    this.multi[0].series.shift();
    const dataX = {
      name: this.counter.toString(),
      value: data.metric,
    };
    this.multi[0].series.push(dataX);
    this.multi = [...this.multi];
  }

  onSelect(event) {
    console.log(event);
  }

  getDateType() {
    this.concetrationService
      .getConcentrationByDate(this.informeSelected)
      .subscribe((data) => {
        this.xAxisLabelMultiDate = this.informeSelected;
        this.multiDate[0].series = [];
        this.multiDate[0].name = this.informeSelected;
        this.multiDate[0].series.shift();
        data.forEach((d: any) => {
          this.multiDate[0].series.push({
            name: d._id,
            value: d.value,
          });
        });
        const sortedMultiDate = this.multiDate;
        console.log("sorted", sortedMultiDate[0].series);
        const orderArray = sortedMultiDate[0].series.sort(
          function (a, b) {
            a = Number(a.name.split('-').join(''));
            b = Number(b.name.split('-').join(''));
            return a - b;
          }
        );
        console.log(orderArray);
        this.multiDate = [...sortedMultiDate];
        // console.log(this.multiDate);
      });
  }
}
