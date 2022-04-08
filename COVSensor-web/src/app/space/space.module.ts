import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpaceRoutingModule } from './space-routing.module';
import { SpacePanelComponent } from './components/space-panel/space-panel.component';
import { SpaceRegisterComponent } from './components/space-register/space-register.component';
import { SpaceDetailComponent } from './components/space-detail/space-detail.component';
import { UpdateSpaceComponent } from './components/update-space/update-space.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    SpacePanelComponent,
    SpaceRegisterComponent,
    SpaceDetailComponent,
    UpdateSpaceComponent,
  ],
  imports: [
    CommonModule,
    SpaceRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
  ],
})
export class SpaceModule {}
