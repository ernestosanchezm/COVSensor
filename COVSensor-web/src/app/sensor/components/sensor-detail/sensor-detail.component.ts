import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClosedspaceService } from 'src/app/services/closedspace.service';
import { SensorService } from 'src/app/services/sensor.service';

@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.scss'],
})
export class SensorDetailComponent implements OnInit {
  closeSpace;
  id_Arduino;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private closeSpaceService: ClosedspaceService,
    private sensorService: SensorService
  
  ) {}

  ngOnInit(): void {
    this.closeSpaceService
      .getByArduino(this.data.sensor.id_Arduino)
      .subscribe((resCloseSpace) => {
        this.closeSpace = resCloseSpace;
      });
  }
}
