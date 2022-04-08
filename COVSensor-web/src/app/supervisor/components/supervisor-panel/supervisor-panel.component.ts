import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'src/app/delete-modal/delete-modal.component';
import { SupervisorDetailComponent } from '../supervisor-detail/supervisor-detail.component';

@Component({
  selector: 'app-supervisor-panel',
  templateUrl: './supervisor-panel.component.html',
  styleUrls: ['./supervisor-panel.component.scss'],
})
export class SupervisorPanelComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Correo', 'Acciones'];

  filterSupervisor = '';

  // filterCriteria = '';

  supervisores = [
    {
      nombre: 'Miguel',
      apellido: 'Ore',
      correo: 'miguel@correo.com',
    },
    {
      nombre: 'Ayelen',
      apellido: 'Quintana',
      correo: 'ayelen@correo.com',
    },
    {
      nombre: 'Walter',
      apellido: 'Emanuel',
      correo: 'walter@correo.com',
    },
  ];

  constructor(private router: Router, public dialog: MatDialog) {}

  openDialog(supervisor: any) {
    this.dialog.open(SupervisorDetailComponent, {
      data: {
        supervisor,
      },
    });
  }

  ngOnInit(): void {}

  // search(){
  //   this.filterCriteria = this.filterSupervisor;
  // }

  openDeleteDialog() {
    this.dialog.open(DeleteModalComponent, {
      data: {
        item: 'Supervisor',
      },
    });
  }

  goToDetail(supervisor: any) {
    this.router.navigateByUrl('/supervisor/detail', { state: supervisor });
  }

  goToEdit(supervisor: any) {
    this.router.navigateByUrl('/supervisor/edit', { state: supervisor });
  }
}
