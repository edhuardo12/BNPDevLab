import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfirmationComponent } from '../dialogs/confirmation/confirmation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _dialog: MatDialog,
    private _auth: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  opened = true;
  tokenPayload: any;
  role: any;

  ngOnInit(): void {
    this._auth.validateToken();
    this.tokenPayload = this._auth.getTokenPayload();
    this.role = this.tokenPayload.role;
  }

  openConfirmationDialog(title: string, content: string) {
    let dialogRef = this._dialog.open(ConfirmationComponent, {
      data: {
        title: title,
        content: content,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this._auth.signOut();
      }
    });
  }
}
