import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationComponent } from '../events/confirmation/confirmation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'GPMC | Gestión Tickets';
  role: any;
  opened = true;
  tokenPayload: any;
  tickets_number: any;
  constructor(
    private _dialog: MatDialog,
    private _auth: AuthService,
    private _uapi: ApiService
  ) {
    this.role = this._auth.getRole();
  }

  ngOnInit(): void {
    this._auth.validateToken();
    this.tokenPayload = this._auth.getTokenPayload();
    this.getUnassignedTickets();
  }

  getUnassignedTickets() {
    this._uapi.callGetExecute('1', '').subscribe((res) => {
      let cantidad = res[0].cantidad_tickets;
      if (cantidad > 0) {
        this.tickets_number = '!';
      } else {
        this.tickets_number = null;
      }
    });
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

  canActivate(roleList: string[]) {
    if (roleList.includes(this.role)) {
      return true;
    } else {
      return false;
    }
  }
}
