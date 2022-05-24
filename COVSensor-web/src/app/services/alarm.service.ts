import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlarmService {
  constructor(private http: HttpClient) {}

  getAlarms(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/alarms`)
      .pipe(catchError((e) => throwError(e)));
  }

  updateAlarms(alarm: any): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}/alarms/update`, alarm)
      .pipe(catchError((e) => throwError(e)));
  }

  deleteAlarms(id: any): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/alarms/${id}`)
      .pipe(catchError((e) => throwError(e)));
  }

  getAlarmById(id: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/alarms/${id}`)
      .pipe(catchError((e) => throwError(e)));
  }

  getAlarmByIdArduino(id: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/alarms/arduino/${id}`)
      .pipe(catchError((e) => throwError(e)));
  }
}
