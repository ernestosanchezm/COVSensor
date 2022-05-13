import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AirbombService } from 'src/app/services/airbomb.service';
import { AlarmService } from 'src/app/services/alarm.service';
import { ClosedspaceService } from 'src/app/services/closedspace.service';
import { SensorService } from 'src/app/services/sensor.service';
import { SocketService } from 'src/app/services/socket.service';

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

  bombasAire = [];
  myBomba = new FormControl('');

  sensor = null;
  airBomb = null;
  alarm = null;

  displayedColumns: string[] = [
    'Codigo de espacio cerrado',
    'Codigo de bomba de aire',
    'Estatus',
  ];
  displayedColumnsAlarm: string[] = [
    'Codigo de espacio cerrado',
    'Codigo de alarma',
    'Estatus',
  ];
  dataSource = [];
  dataSourceAlarm = [];
  informeSelected = '';

  constructor(
    private closeSpaceService: ClosedspaceService,
    private sensorService: SensorService,
    private airBombService: AirbombService,
    private alarmService: AlarmService,
    private socketService: SocketService
  ) {
    this.form = new FormGroup({
      myBomba: this.myBomba,
    });
    this.closeSpaceService.getClosedspace().subscribe((data) => {
      console.log(data);
      this.bombasAire = data.map((d) => ({
        codigo: d.codigo,
        idArduino: d.id_Arduino,
      }));
    });
  }

  ngOnInit(): void {}

  getArduino() {
    console.log('id bomba: ', this.myBomba.value);
    this.sensorService
      .getSensorById(this.myBomba.value.idArduino)
      .subscribe((data) => {
        this.sensor = data;
        this.airBombService
          .getAirBombById(this.sensor.id_Arduino)
          .subscribe((resAirBomb) => {
            console.log('Air bomb: ', resAirBomb);
            this.airBomb = resAirBomb;
            this.dataSource = [
              {
                codigoEspacioCerrado: this.myBomba.value.codigo,
                codigoBombaAire: this.airBomb?._id,
                estatus: this.airBomb?.status === 'Activo' ? true : false,
              },
            ];
          });
        this.alarmService
          .getAlarmById(this.sensor.id_Arduino)
          .subscribe((resAlarm) => {
            console.log('Alarm: ', resAlarm);
            this.alarm = resAlarm;
            this.dataSourceAlarm = [
              {
                codigoEspacioCerrado: this.myBomba.value.codigo,
                codigoBombaAire: this.alarm?._id,
                estatus: this.alarm?.status === 'Activo' ? true : false,
              },
            ];
          });
      });
  }

  changedStatusAlarm(status) {
    console.log('Alarm status: ', status);
    if (status) {
      this.socketService.emitToServer('alarm/on', 'Turn on');
    } else {
      this.socketService.emitToServer('alarm/off', 'Turn off');
    }
  }

  changedStatusAir(status) {
    console.log('Air status: ', status);
    if (status) {
      this.socketService.emitToServer('air-bomb/on', 'Turn on');
    } else {
      this.socketService.emitToServer('air-bomb/off', 'Turn off');
    }
  }
}
