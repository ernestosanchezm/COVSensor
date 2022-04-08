import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { SupervisorPanelComponent } from './components/supervisor-panel/supervisor-panel.component';
import { SupervisorDetailComponent } from './components/supervisor-detail/supervisor-detail.component';
import { SupervisorCreateComponent } from './components/supervisor-create/supervisor-create.component';
import { MaterialModule } from './../material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './../core/pipes/filter.pipe';
import { DialogUpdateComponent } from './components/dialog-update/dialog-update.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SupervisorUpdateComponent } from './components/supervisor-update/supervisor-update.component';

@NgModule({
  declarations: [
    SupervisorPanelComponent,
    SupervisorDetailComponent,
    SupervisorCreateComponent,
    FilterPipe,
    DialogUpdateComponent,
    SupervisorUpdateComponent,
  ],
  imports: [
    CommonModule,
    SupervisorRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
})
export class SupervisorModule {}
