import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RecoverComponent } from './components/recover/recover.component';

import { MaterialModule } from "./../material/material.module";
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    LoginComponent,
    RecoverComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class AuthModule { }
