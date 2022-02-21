import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentialsModel = new CredentialsClass('', '');
  tokenPayload: any;
  showPassword = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private uApi: ApiService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('OK');
  }

  signIn() {
    this.auth.signIn(this.credentialsModel).subscribe(
      (res) => {
        if (res[0].token != undefined) {
          localStorage.setItem('token', res[0].token);
          this.tokenPayload = this.auth.getTokenPayload();
          localStorage.setItem('username', this.credentialsModel.user_code);
          this.getUserRole(this.credentialsModel.user_code);
        }
      },
      (err) => this.errorHandler(err)
    );
  }

  getUserRole(username: string) {
    this.uApi.callGetExecute('14', username).subscribe((res) => {
      // this.router.navigate(['/EnMantenimiento']);
      if (res != undefined || res != '') {
        this.sendLoginLog(username);
        if (res[0].role_description == 'Analista') {
          this.router.navigate(['/administration']);
        } else {
          this.router.navigate(['/home']);
        }
      }
    });
  }

  sendLoginLog(username: string) {
    let dataArray = {
      opcion: '15',
      SQLStr: username,
    };
    this.uApi.callPostExecute(dataArray).subscribe((res) => {
      console.log('OK');
    });
  }

  errorHandler(err: any) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        //unauthorized
        this.credentialsModel.user_code = '';
        this.credentialsModel.password = '';
      }
    }
  }
}
export class CredentialsClass {
  constructor(public user_code: string, public password: string) {}
}
