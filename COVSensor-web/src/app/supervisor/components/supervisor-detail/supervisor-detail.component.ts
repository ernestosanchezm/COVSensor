import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-supervisor-detail',
  templateUrl: './supervisor-detail.component.html',
  styleUrls: ['./supervisor-detail.component.scss'],
})
export class SupervisorDetailComponent implements OnInit {
  mySupervisor;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.mySupervisor = history.state;
  }
}
