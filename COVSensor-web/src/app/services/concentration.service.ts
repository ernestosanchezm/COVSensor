import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConcentrationService {
  constructor(private http: HttpClient) {}

  getConcentrationByDate(dateType: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/concentration/${dateType}`)
      .pipe(catchError((e) => throwError(e)));
  }

  getAllConcentration(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/concentration/all`)
      .pipe(catchError((e) => throwError(e)));
  }
}
