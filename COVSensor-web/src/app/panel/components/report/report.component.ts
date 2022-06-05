import { Component, OnInit } from '@angular/core';
import { ConcentrationService } from 'src/app/services/concentration.service';
import { AirbombService } from 'src/app/services/airbomb.service';
import { ClosedspaceService } from 'src/app/services/closedspace.service';

// const ELEMENT_DATA: any[] = [{ Periodo: 1, Informe: 'Hydrogen' }];

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  // displayedColumns: string[] = ['Periodo', 'Informe'];
  // dataSource = ELEMENT_DATA;
  informeSelected = '';

  displayedColumns: string[] = ['ClosedSpaceID', 'Value', 'CreationDate'];
  elementData = [];
  bombasAire: any[] = [];


  constructor(private concetrationService: ConcentrationService,
    private airbombService: AirbombService,
    private closedSpaceService: ClosedspaceService) {
    this.concetrationService.getAllConcentration().subscribe((data) => {
      this.elementData = [...data];
      console.log(this.elementData);
    });
    this.closedSpaceService.getClosedspace().subscribe((data) => {
      this.bombasAire.push(data[0].codigo);
      console.log(this.bombasAire);
    })
  }

  ngOnInit(): void { }

  getSpace() {
    
  }
}
