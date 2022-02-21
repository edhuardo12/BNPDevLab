import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signIn(credentials: any) {
    let url = environment.apiUrl;

    return this.http.post<any>(url + 'login', credentials);
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isSignedIn() {
    return !!localStorage.getItem('token');
  }

  getUserRole() {
    return !!localStorage.getItem('userRole');
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  getTokenPayload() {
    var base64Url = this.getToken().split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }
}
