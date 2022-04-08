import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AirRoutingModule } from './air-routing.module';
import { AirPanelComponent } from './components/air-panel/air-panel.component';
import { AirRegisterComponent } from './components/air-register/air-register.component';
import { AirDetailComponent } from './components/air-detail/air-detail.component';
import { UpdateAirComponent } from './components/update-air/update-air.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MaterialModule } from '../material/material.module';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AirPanelComponent,
    AirRegisterComponent,
    AirDetailComponent,
    UpdateAirComponent,
  ],
  imports: [
    CommonModule,
    AirRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
  ],
})
export class AirModule {}
