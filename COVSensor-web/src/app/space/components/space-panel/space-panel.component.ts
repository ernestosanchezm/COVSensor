import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'src/app/delete-modal/delete-modal.component';
import { SpaceDetailComponent } from '../space-detail/space-detail.component';

@Component({
  selector: 'app-space-panel',
  templateUrl: './space-panel.component.html',
  styleUrls: ['./space-panel.component.scss'],
})
export class SpacePanelComponent implements OnInit {
  displayedColumns: string[] = [
    'Codigo',
    'Descripcion',
    'Asignado',
    'Acciones',
  ];

  filterSpace = '';

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.spaces.filterPredicate = (data: any, filter: any) =>
      data.codigo.toLocaleLowerCase().includes(filterValue);
    this.spaces.filter = filterValue.trim().toLowerCase();
  }

  constructor(private router: Router, public dialog: MatDialog) {}

  spaces = new MatTableDataSource([
    {
      codigo: 'A-1',
      descripcion: 'Oficina Principal',
      asignado: true,
    },
    {
      codigo: 'B-2',
      descripcion: 'Oficina Secundaria',
      asignado: false,
    },
    {
      codigo: 'C-1',
      descripcion: 'Recepcion',
      asignado: true,
    },
  ]);

  ngOnInit(): void {}

  openDialog(space: any) {
    this.dialog.open(SpaceDetailComponent, {
      data: {
        space,
        sensor: 'S-1',
        air: 'A-1',
        alarm: 'AL-1',
      },
    });
  }

  openDeleteDialog() {
    this.dialog.open(DeleteModalComponent, {
      data: {
        item: 'Espacio cerrado',
      },
    });
  }

  goToDetail(space: any) {
    this.router.navigateByUrl('/space/detail', { state: space });
  }

  goToEdit(space: any) {
    this.router.navigateByUrl('/space/edit', { state: space });
  }
}
