import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SupervisorPanelComponent } from './components/supervisor-panel/supervisor-panel.component';
import { SupervisorDetailComponent } from './components/supervisor-detail/supervisor-detail.component';
import { SupervisorCreateComponent } from './components/supervisor-create/supervisor-create.component';
import { SupervisorUpdateComponent } from './components/supervisor-update/supervisor-update.component';

const routes: Routes = [
  {
    path: '',
    component: SupervisorPanelComponent,
  },
  {
    path: 'detail',
    component: SupervisorDetailComponent,
  },
  {
    path: 'create',
    component: SupervisorCreateComponent,
  },
  {
    path: 'edit',
    component: SupervisorUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisorRoutingModule {}
