import { Component, OnInit } from '@angular/core';

const ELEMENT_DATA: any[] = [{ Periodo: 1, Informe: 'Hydrogen' }];

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  displayedColumns: string[] = ['Periodo', 'Informe'];
  dataSource = ELEMENT_DATA;
  informeSelected = '';

  constructor() {}

  ngOnInit(): void {}
}
