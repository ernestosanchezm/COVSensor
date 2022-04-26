import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.authService
      .deleteSupervisor(this.data.supervisor._id)
      .subscribe((data) => {
        if (data) {
          console.log('SUPERVISOR DELETED: ', data);
        }
      });
  }
}
