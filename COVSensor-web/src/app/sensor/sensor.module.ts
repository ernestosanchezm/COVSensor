import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensorRoutingModule } from './sensor-routing.module';
import { SensorPanelComponent } from './components/sensor-panel/sensor-panel.component';
import { SensorDetailComponent } from './components/sensor-detail/sensor-detail.component';
import { UpdateSensorComponent } from './components/update-sensor/update-sensor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    SensorPanelComponent,
    SensorDetailComponent,
    UpdateSensorComponent,
  ],
  imports: [
    CommonModule,
    SensorRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
  ],
})
export class SensorModule {}
