import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService) {}

  intercept(
    req: { clone: (arg0: { setHeaders: { Authorization: string } }) => any },
    next: { handle: (arg0: any) => any }
  ) {
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this._auth.getToken()}`,
      },
    });
    return next.handle(tokenizedReq);
  }
}
