import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClosedspaceService {
  constructor(private http: HttpClient) {}

  createClosedspace(closedspace: any): Observable<any> {
    return this.http
      .post(`${environment}/closedspace/add`, closedspace)
      .pipe(catchError((e) => throwError(e)));
  }

  getClosedspace(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/closedspace`)
      .pipe(catchError((e) => throwError(e)));
  }
}
