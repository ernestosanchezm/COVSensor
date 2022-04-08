import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-air-detail',
  templateUrl: './air-detail.component.html',
  styleUrls: ['./air-detail.component.scss'],
})
export class AirDetailComponent implements OnInit {
  myAir;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.myAir = history.state;
  }
}
