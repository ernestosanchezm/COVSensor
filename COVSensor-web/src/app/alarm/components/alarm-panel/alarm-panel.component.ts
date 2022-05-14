import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AirDetailComponent } from 'src/app/air/components/air-detail/air-detail.component';
import { DeleteModalComponent } from 'src/app/delete-modal/delete-modal.component';
import { AlarmDetailComponent } from '../alarm-detail/alarm-detail.component';

@Component({
  selector: 'app-alarm-panel',
  templateUrl: './alarm-panel.component.html',
  styleUrls: ['./alarm-panel.component.scss'],
})
export class AlarmPanelComponent implements OnInit {
  displayedColumns: string[] = [
    'Codigo Espacio Cerrado',
    'Asignado',
    'Descripcion',
    'Codigo de Dispositivo',
    'Acciones',
  ];

  filterSpace = '';

  constructor(private router: Router, public dialog: MatDialog) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.alarms.filterPredicate = (data: any, filter: any) =>
      data.codigoEspacioCerrado.toLocaleLowerCase().includes(filterValue);
    this.alarms.filter = filterValue.trim().toLocaleLowerCase();
  }

  ngOnInit(): void {}

  alarms = new MatTableDataSource([
    {
      codigoEspacioCerrado: 'A-1',
      asignado: false,
      descripcion: 'Oficina Principal',
      codigoDispositivo: 'AL-1',
    },
    {
      codigoEspacioCerrado: 'B-2',
      asignado: true,
      descripcion: 'Oficina Secundaria',
      codigoDispositivo: 'AL-2',
    },
    {
      codigoEspacioCerrado: 'C-1',
      asignado: true,
      descripcion: 'Recepcion',
      codigoDispositivo: 'AL-3',
    },
  ]);

  openDialog(alarm: any) {
    this.dialog.open(AlarmDetailComponent, {
      data: {
        alarm,
      },
    });
  }

  openDeleteDialog() {
    this.dialog.open(DeleteModalComponent, {
      data: {
        item: 'Alarma',
      },
    });
  }

  goToDetail(alarm: any) {
    this.router.navigateByUrl('/alarm/detail', { state: alarm });
  }

  goToEdit(alarm: any) {
    this.router.navigateByUrl('/alarm/edit', { state: alarm });
  }
}
