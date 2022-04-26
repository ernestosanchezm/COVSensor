import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'src/app/delete-modal/delete-modal.component';
import { SensorService } from 'src/app/services/sensor.service';
import { SensorDetailComponent } from '../sensor-detail/sensor-detail.component';

@Component({
  selector: 'app-sensor-panel',
  templateUrl: './sensor-panel.component.html',
  styleUrls: ['./sensor-panel.component.scss'],
})
export class SensorPanelComponent implements OnInit {
  displayedColumns: string[] = [
    'Codigo Espacio Cerrado',
    'Asignado',
    'Descripcion',
    'Acciones',
  ];

  filterSpace = '';

  sensors = null;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private sensorService: SensorService
  ) {
    this.sensorService.getSensors().subscribe((data) => {
      if (data) {
        this.sensors = new MatTableDataSource(data);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sensors.filterPredicate = (data: any, filter: any) =>
      data.codigoEspacioCerrado.toLocaleLowerCase().includes(filterValue);
    this.sensors.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {}

  openDialog(sensor: any) {
    this.dialog.open(SensorDetailComponent, {
      data: {
        sensor,
        air: 'BA-1',
        alarm: 'AL-1',
      },
    });
  }

  openDeleteDialog() {
    this.dialog.open(DeleteModalComponent, {
      data: {
        item: 'Sensor',
      },
    });
  }

  goToDetail(sensor: any) {
    this.router.navigateByUrl('/sensor/detail', { state: sensor });
  }

  goToEdit(sensor: any) {
    this.router.navigateByUrl('/sensor/edit', { state: sensor });
  }
}
