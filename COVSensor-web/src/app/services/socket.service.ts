import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private clientSocket: any;
  constructor() {
    this.clientSocket = socketIo.connect(`${environment.socketurl}`);
  }

  listenToServer(connection: string): Observable<any> {
    return new Observable((subscribe) => {
      this.clientSocket.on(connection, (data) => {
        subscribe.next(data);
      });
    });
  }

  emitToServer(connection: string, message: string): void {
    this.clientSocket.emit(connection, message);
  }
}
