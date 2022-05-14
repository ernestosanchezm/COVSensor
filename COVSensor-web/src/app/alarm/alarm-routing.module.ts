import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmPanelComponent } from './components/alarm-panel/alarm-panel.component';
import { UpdateAlarmComponent } from './components/update-alarm/update-alarm.component';

const routes: Routes = [
  {
    path: '',
    component: AlarmPanelComponent,
  },
  {
    path: 'edit',
    component: UpdateAlarmComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmRoutingModule {}
