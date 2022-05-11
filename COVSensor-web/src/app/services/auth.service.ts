import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginUser(user: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/users/login`, user)
      .pipe(catchError((e) => throwError(e)));
  }

  recoverPassword(email: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/password-recovery`, email)
      .pipe(catchError((e) => throwError(e)));
  }

  getUser(username: any): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/users/${username}`)
      .pipe(catchError((e) => throwError(e)));
  }

  updateAdmin(user: any): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}/users/admin/update`, user)
      .pipe(catchError((e) => throwError(e)));
  }

  updateSupervisor(supervisor: any): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}/users/supervisors/update`, supervisor)
      .pipe(catchError((e) => throwError(e)));
  }

  createSupervisor(supervisor: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/users/supervisors/add`, supervisor)
      .pipe(catchError((e) => throwError(e)));
  }

  getSupervisors(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/users/supervisors`)
      .pipe(catchError((e) => throwError(e)));
  }

  deleteSupervisor(id: any): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/users/supervisors/${id}`)
      .pipe(catchError((e) => throwError(e)));
  }
}
