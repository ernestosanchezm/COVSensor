import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavComponent } from "./nav/nav.component";

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'supervisor',
        loadChildren: () => import('./supervisor/supervisor.module').then(m => m.SupervisorModule)
      },
      {
        path: 'space',
        loadChildren: () => import('./space/space.module').then(m => m.SpaceModule)
      },
      {
        path: 'sensor',
        loadChildren: () => import('./sensor/sensor.module').then(m => m.SensorModule)
      },
      {
        path: 'air',
        loadChildren: () => import('./air/air.module').then(m => m.AirModule)
      },
      {
        path: 'panel',
        loadChildren: () => import('./panel/panel.module').then(m => m.PanelModule)
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
