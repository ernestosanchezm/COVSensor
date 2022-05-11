import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AirDetailComponent } from 'src/app/air/components/air-detail/air-detail.component';
import { DeleteModalComponent } from 'src/app/delete-modal/delete-modal.component';
import { AlarmService } from 'src/app/services/alarm.service';
import { AlarmDetailComponent } from '../alarm-detail/alarm-detail.component';

@Component({
  selector: 'app-alarm-panel',
  templateUrl: './alarm-panel.component.html',
  styleUrls: ['./alarm-panel.component.scss'],
})
export class AlarmPanelComponent implements OnInit {
  displayedColumns: string[] = [
    'Codigo Alarma',
    'Asignado',
    'Descripcion',
    'Acciones',
  ];

  filterSpace = '';

  alarms;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private alarmService: AlarmService
  ) {
    this.alarmService.getAlarms().subscribe((res) => {
      this.alarms = new MatTableDataSource(
        res.map((alarm) => ({
          ...alarm,
          asignado: alarm.status,
          descripcion: alarm.description,
        }))
      );
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.alarms.filterPredicate = (data: any, filter: any) =>
      data._id.toLocaleLowerCase().includes(filterValue.toLowerCase());
    this.alarms.filter = filterValue.trim().toLocaleLowerCase();
  }

  ngOnInit(): void {}

  getData() {
    this.alarmService.getAlarms().subscribe((data) => {
      if (data) {
        this.alarms = data;
      }
    });
  }

  openDialog(alarm: any) {
    this.dialog.open(AlarmDetailComponent, {
      data: {
        alarm,
      },
    });
  }

  openDeleteDialog(alarm: any) {
    this.dialog.open(DeleteModalComponent, {
      data: {
        item: 'Alarma',
        alarma: alarm,
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
