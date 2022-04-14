import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'src/app/delete-modal/delete-modal.component';
import { SensorDetailComponent } from '../sensor-detail/sensor-detail.component';

@Component({
  selector: 'app-sensor-panel',
  templateUrl: './sensor-panel.component.html',
  styleUrls: ['./sensor-panel.component.scss'],
})
export class SensorPanelComponent implements OnInit {
  displayedColumns: string[] = [
    'Codigo Espacio Cerrado',
    'Estado',
    'Descripcion',
    'Acciones',
  ];

  filterSpace = '';

  constructor(private router: Router, public dialog: MatDialog) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sensors.filterPredicate = (data: any, filter: any) =>
      data.codigoEspacioCerrado.toLocaleLowerCase().includes(filterValue);
    this.sensors.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {}

  sensors = new MatTableDataSource([
    {
      codigoEspacioCerrado: 'A-1',
      estado: true,
      descripcion: 'Oficina Principal',
    },
    {
      codigoEspacioCerrado: 'B-2',
      estado: true,
      descripcion: 'Oficina Secundaria',
    },
    {
      codigoEspacioCerrado: 'C-1',
      estado: false,
      descripcion: 'Recepcion',
    },
  ]);

  openDialog(sensor: any) {
    this.dialog.open(SensorDetailComponent, {
      data: {
        sensor,
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
