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
  isAuth = localStorage.getItem('userName');
  userName: any = jwt(this.isAuth);
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
    if (this.isAuth) {
      this.authService.getUser(this.userName.username).subscribe(
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
