import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from './../dialog/dialog.component';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
})
export class RecoverComponent implements OnInit {
  form: FormGroup;
  isError = false;

  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private location: Location,
    private auth: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get emailField() {
    return this.form.get('email');
  }

  openDialog() {
    const emailData = {
      eMail: this.form.value.email,
    };
    this.auth.recoverPassword(emailData).subscribe(
      (data) => {
        if (data) {
          console.log(data);
          this.matDialog.open(DialogComponent);
        }
      },
      (err) => {
        if (err) {
          this.isError = true;
          setTimeout(() => {
            this.isError = false;
          }, 3000);
        }
      }
    );
  }

  goToBack() {
    this.location.back();
  }
}
