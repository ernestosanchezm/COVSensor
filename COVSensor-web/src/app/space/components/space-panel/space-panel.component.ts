import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'src/app/delete-modal/delete-modal.component';
import { ClosedspaceService } from 'src/app/services/closedspace.service';
import { SpaceDetailComponent } from '../space-detail/space-detail.component';

@Component({
  selector: 'app-space-panel',
  templateUrl: './space-panel.component.html',
  styleUrls: ['./space-panel.component.scss'],
})
export class SpacePanelComponent implements OnInit {
  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Acciones'];
  spaces;
  filterSpace = '';

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.spaces.filterPredicate = (data: any, filter: any) =>
      data.codigo.toLocaleLowerCase().includes(filterValue.toLowerCase());
    this.spaces.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private closedSpaceService: ClosedspaceService
  ) {
    this.closedSpaceService.getClosedspace().subscribe((res) => {
      this.spaces = new MatTableDataSource(
        res.map(({ description, ...res }) => ({
          ...res,
          descripcion: description,
        }))
      );
    });
  }

  ngOnInit(): void {}

  getData() {
    this.closedSpaceService.getClosedspace().subscribe((data) => {
      if (data) {
        this.spaces = data;
      }
    });
  }

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

  openDeleteDialog(closedSpace: any) {
    this.dialog.open(DeleteModalComponent, {
      data: {
        item: 'Espacio cerrado',
        closedSpace,
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
