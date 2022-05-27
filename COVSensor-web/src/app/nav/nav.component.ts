import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import jwt from 'jwt-decode';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isAuth = null;
  userName: any = null;
  user = null;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuth = localStorage.getItem('token');
    if (this.isAuth) {
      this.userName = jwt(this.isAuth);
      this.authService.getUser(this.userName.email).subscribe(
        (data) => {
          this.user = data;
        },
        (err) => {
          console.error(err);
        }
      );
      this.router.navigateByUrl('/panel');
    } else {
      this.router.navigateByUrl('/home');
    }
  }
}
