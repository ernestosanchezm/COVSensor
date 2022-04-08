import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { DevicesComponent } from './components/devices/devices.component';
import { ReportComponent } from './components/report/report.component';
import { AirControlComponent } from './components/air-control/air-control.component';
import { Co2ControlComponent } from './components/co2-control/co2-control.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    DevicesComponent,
    ReportComponent,
    AirControlComponent,
    Co2ControlComponent,
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
})
export class PanelModule {}
