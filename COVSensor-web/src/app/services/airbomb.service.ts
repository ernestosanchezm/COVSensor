import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AirbombService {
  constructor(private http: HttpClient) {}

  getAirBombs(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/air-bombs`)
      .pipe(catchError((e) => throwError(e)));
  }

  updateAirBomb(airBomb: any): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}/air-bombs/update`, airBomb)
      .pipe(catchError((e) => throwError(e)));
  }

  deleteAirBomb(id: any): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/air-bombs/${id}`)
      .pipe(catchError((e) => throwError(e)));
  }
}
