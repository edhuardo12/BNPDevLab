import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _sb: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this._router.navigate(['/home']);
    }
  }

  submitEventTriggered = false;

  title: string = 'Dashboard General | Sucursal';
  hide: boolean = true;

  signInForm = this._formBuilder.group({
    user_code: null,
    password: null,
  });

  get user_code() {
    return this.signInForm.get('user_code');
  }
  get password() {
    return this.signInForm.get('password');
  }

  openHelpDialog() {
    console.log('ok');
  }

  signIn() {
    if (this.submitEventTriggered === false) {
      this.submitEventTriggered = true;
      this._auth.signIn(this.signInForm.value).subscribe(
        (res) => {
          if (res[0].token != undefined) {
            this.submitEventTriggered = false;
            localStorage.setItem('token', res[0].token);
            this._router.navigate(['/home']);
          }
        },
        (err) => {
          this.submitEventTriggered = false;
          this.errorHandler(err);
        }
      );
    }
  }

  errorHandler(err: HttpErrorResponse) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this.signInForm.setValue({
          //or patchValue
          user_code: null,
          password: null,
        });

        this._sb.open('Credenciales inválidas', '¡Upss!', {
          duration: 3000,
        });
      }
    }
  }
}
