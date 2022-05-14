import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-air-detail',
  templateUrl: './air-detail.component.html',
  styleUrls: ['./air-detail.component.scss'],
})
export class AirDetailComponent implements OnInit {
  myAir;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.myAir = history.state;
  }
}
