import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpaceDetailComponent } from './components/space-detail/space-detail.component';
import { SpacePanelComponent } from './components/space-panel/space-panel.component';
import { SpaceRegisterComponent } from './components/space-register/space-register.component';
import { UpdateSpaceComponent } from './components/update-space/update-space.component';

const routes: Routes = [
  {
    path: '',
    component: SpacePanelComponent,
  },
  {
    path: 'detail',
    component: SpaceDetailComponent,
  },
  {
    path: 'create',
    component: SpaceRegisterComponent,
  },
  {
    path: 'edit',
    component: UpdateSpaceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaceRoutingModule {}
