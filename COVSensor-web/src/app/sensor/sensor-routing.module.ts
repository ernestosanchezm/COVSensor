import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorDetailComponent } from './components/sensor-detail/sensor-detail.component';
import { SensorPanelComponent } from './components/sensor-panel/sensor-panel.component';
import { UpdateSensorComponent } from './components/update-sensor/update-sensor.component';

const routes: Routes = [
  {
    path: '',
    component: SensorPanelComponent,
  },
  {
    path: 'detail',
    component: SensorDetailComponent,
  },
  {
    path: 'edit',
    component: UpdateSensorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SensorRoutingModule {}
