import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  role: string;

  constructor(private _auth: AuthService, private _router: Router) {
    this.role = this._auth.getRole();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkRole(route, state.url);
  }

  checkRole(route: any, url: string) {
    //true | UrlTree
    if (route.data.role.includes(this.role)) {
      return true;
    }

    // Store the attempted URL for redirecting
    this._auth.redirectUrl = url;

    // Redirect to the login page
    // return this._router.parseUrl('/login');
    return false;
  }
}
