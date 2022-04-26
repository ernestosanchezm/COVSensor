import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlarmRoutingModule } from './alarm-routing.module';
import { AlarmPanelComponent } from './components/alarm-panel/alarm-panel.component';
import { AlarmDetailComponent } from './components/alarm-detail/alarm-detail.component';
import { UpdateAlarmComponent } from './components/update-alarm/update-alarm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    AlarmPanelComponent,
    AlarmDetailComponent,
    UpdateAlarmComponent,
  ],
  imports: [
    CommonModule,
    AlarmRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
  ],
})
export class AlarmModule {}
