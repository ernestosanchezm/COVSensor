import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'src/app/delete-modal/delete-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { SupervisorDetailComponent } from '../supervisor-detail/supervisor-detail.component';

@Component({
  selector: 'app-supervisor-panel',
  templateUrl: './supervisor-panel.component.html',
  styleUrls: ['./supervisor-panel.component.scss'],
})
export class SupervisorPanelComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Correo', 'Acciones'];
  supervisores = [];
  filterSupervisor = '';

  // filterCriteria = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.authService.getSupervisors().subscribe((data) => {
      if (data) {
        this.supervisores = data;
      }
    });
  }

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

  getData() {
    this.authService.getSupervisors().subscribe((data) => {
      if (data) {
        this.supervisores = data;
      }
    });
  }

  openDeleteDialog(supervisor: any) {
    this.dialog.open(DeleteModalComponent, {
      data: {
        item: 'Supervisor',
        supervisor,
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
