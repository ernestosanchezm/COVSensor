import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AirbombService } from '../services/airbomb.service';
import { AlarmService } from '../services/alarm.service';
import { AuthService } from '../services/auth.service';
import { ClosedspaceService } from '../services/closedspace.service';
import { SensorService } from '../services/sensor.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private sensorService: SensorService,
    private airBombService: AirbombService,
    private closedSpaceService: ClosedspaceService,
    private alarmService: AlarmService
  ) {}

  ngOnInit(): void {}

  delete() {
    if (this.data.supervisor) {
      this.authService
        .deleteSupervisor(this.data.supervisor.userName)
        .subscribe((data) => {
          if (data) {
            console.log('SUPERVISOR DELETED: ', data);
          }
        });
    } else if (this.data.sensor) {
      this.sensorService
        .deleteSensor(this.data.sensor._id)
        .subscribe((data) => {
          if (data) {
            console.log('SENSOR DELETED: ', data);
          }
        });
    } else if (this.data.airBomb) {
      this.airBombService
        .deleteAirBomb(this.data.airBomb._id)
        .subscribe((data) => {
          if (data) {
            console.log('AIR BOMB DELETED: ', data);
          }
        });
    } else if (this.data.closedSpace) {
      this.closedSpaceService
        .deleteCloseSpace(this.data.closedSpace._id)
        .subscribe((data) => {
          if (data) {
            console.log('CLOSED SPACE DELETED: ', data);
          }
        });
    } else if (this.data.alarma) {
      this.alarmService.deleteAlarms(this.data.alarma._id).subscribe((data) => {
        if (data) {
          console.log('ALARM DELETED: ', data);
        }
      });
    }
  }
}
