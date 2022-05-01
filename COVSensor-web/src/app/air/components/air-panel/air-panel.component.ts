import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'src/app/delete-modal/delete-modal.component';
import { AirbombService } from 'src/app/services/airbomb.service';
import { AirDetailComponent } from '../air-detail/air-detail.component';

@Component({
  selector: 'app-air-panel',
  templateUrl: './air-panel.component.html',
  styleUrls: ['./air-panel.component.scss'],
})
export class AirPanelComponent implements OnInit {
  displayedColumns: string[] = [
    'Codigo Bombas Aire',
    'Asignado',
    'Descripcion',
    'Acciones',
  ];

  filterSpace = '';

  bombas = null;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private airBombService: AirbombService
  ) {
    this.airBombService.getAirBombs().subscribe((data) => {
      this.bombas = new MatTableDataSource(data);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.bombas.filterPredicate = (data: any, filter: any) =>
      data._id.toLocaleLowerCase().includes(filterValue);
    this.bombas.filter = filterValue.trim().toLocaleLowerCase();
  }

  ngOnInit(): void {}

  getData() {
    this.airBombService.getAirBombs().subscribe((data) => {
      if (data) {
        this.bombas = data;
      }
    });
  }

  openDialog(bombaAire: any) {
    this.dialog.open(AirDetailComponent, {
      data: {
        bombaAire,
      },
    });
  }

  openDeleteDialog(bombaAire: any) {
    this.dialog.open(DeleteModalComponent, {
      data: {
        item: 'Bomba de aire',
        airBomb: bombaAire,
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
