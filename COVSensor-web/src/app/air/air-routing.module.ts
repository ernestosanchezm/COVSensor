import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirDetailComponent } from './components/air-detail/air-detail.component';
import { AirPanelComponent } from './components/air-panel/air-panel.component';
import { UpdateAirComponent } from './components/update-air/update-air.component';

const routes: Routes = [
  {
    path: '',
    component: AirPanelComponent,
  },
  {
    path: 'detail',
    component: AirDetailComponent,
  },
  {
    path: 'edit',
    component: UpdateAirComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirRoutingModule {}
