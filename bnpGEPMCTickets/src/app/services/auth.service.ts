import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotificationComponent } from 'src/app/components/events/notification/notification.component'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _dialog: MatDialog
  ) {}

  redirectUrl!: string;

  signIn(credentials: any) {
    return this._http.post<any>(environment.apiUrl + 'sign-in', credentials);
  }

  signOut() {
    localStorage.removeItem('token');
    this._router.navigate(['/sign-in']);
  }

  isSignedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  getRole() {
    return this.getTokenPayload().role;
  }

  getTokenPayload() {
    var base64Url = this.getToken().split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }

  validateToken() {
    let payload = this.getTokenPayload();
    if (Date.now() > payload.exp) {
      this.signOut();
    } else {
      this.setValidateTokenTimer();
    }
  }

  setValidateTokenTimer() {
    let payload = this.getTokenPayload();
    var miliseconds = payload.exp - Date.now();
    setTimeout(() => {
      setTimeout(() => {
        this.validateToken();
      }, miliseconds + 1000);
      let title = '¡Tu sesión terminará pronto!';
      let content =
        'Por seguridad, tu sesión terminará en menos de 1 minuto...';
      this._dialog.open(NotificationComponent, {
        data: {
          title: title,
          content: content,
        },
      });
    }, miliseconds - 60000); //example: 3600000 = validate token every hour
  }

  errorHandler(err: HttpErrorResponse) {
    console.log(err);
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this._router.navigate(['/sign-in']);
      }
    }
  }
}
