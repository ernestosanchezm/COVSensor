import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  constructor(private http: HttpClient) {}

  getSensors(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/sensors`)
      .pipe(catchError((e) => throwError(e)));
  }

  updateSensor(sensor: any): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}/sensors/update`, sensor)
      .pipe(catchError((e) => throwError(e)));
  }

  deleteSensor(id: any): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/sensors/${id}`)
      .pipe(catchError((e) => throwError(e)));
  }

  getSensorById(id: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/sensors/${id}`)
      .pipe(catchError((e) => throwError(e)));
  }
}
