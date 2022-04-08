import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'src/app/delete-modal/delete-modal.component';
import { AirDetailComponent } from '../air-detail/air-detail.component';

@Component({
  selector: 'app-air-panel',
  templateUrl: './air-panel.component.html',
  styleUrls: ['./air-panel.component.scss'],
})
export class AirPanelComponent implements OnInit {
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
    this.bombas.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {}

  bombas = new MatTableDataSource([
    {
      codigoEspacioCerrado: 'A-1',
      estado: false,
      descripcion: 'Oficina Principal',
    },
    {
      codigoEspacioCerrado: 'B-2',
      estado: true,
      descripcion: 'Oficina Secundaria',
    },
    {
      codigoEspacioCerrado: 'C-1',
      estado: true,
      descripcion: 'Recepcion',
    },
  ]);

  openDialog(bombaAire: any) {
    this.dialog.open(AirDetailComponent, {
      data: {
        bombaAire,
      },
    });
  }

  openDeleteDialog() {
    this.dialog.open(DeleteModalComponent, {
      data: {
        item: 'Bomba de aire',
      },
    });
  }

  goToDetail(bombaAire: any) {
    this.router.navigateByUrl('/air/detail', { state: bombaAire });
  }

  goToEdit(bombaAire: any) {
    this.router.navigateByUrl('/air/edit', { state: bombaAire });
  }
}
