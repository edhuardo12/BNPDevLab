import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { TicketCommentsComponent } from './ticket-comments/ticket-comments.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
})
export class TicketDetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TicketDetailComponent>,
    private _dialog: MatDialog,
    public uApi: ApiService,
    private _auth: AuthService,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ticketNumber: any;
    }
  ) {}

  arrayData!: any;
  arrayDataComments!: any;
  dtOptions: any = {};
  dtOptionsC: any = {};
  showtable = false;
  showtableComments = false;
  step!: any;
  ticketNumber!: any;
  tokenPayload: any;

  ngOnInit(): void {
    this.tokenPayload = this._auth.getTokenPayload();
    this.ticketNumber = this.data.ticketNumber;
    this.dtOptions = {
      responsive: true,
      searching: false,
      paging: false,
      info: false,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.showCommentArea(data);
        });
        return row;
      },
    };
    this.dtOptionsC = {
      responsive: true,
      searching: false,
      paging: false,
      info: false,
    };
    this.getTicketData(this.data.ticketNumber);
  }

  getTicketData(ticketNumber: string) {
    this.uApi.callGetExecute('9', ticketNumber).subscribe(
      (res) => ((this.arrayData = res), (this.showtable = true)),
      (err) => console.log(err)
    );
  }

  showCommentArea(data: any) {
    this.step = data[0];

    let d = {
      _ticketNumber: this.ticketNumber,
      _step: this.step,
    };

    this.uApi.callGetComments('11', d).subscribe(
      (res) => {
        this.arrayDataComments = res;
        this.showtableComments = true;
      },
      (err) => console.log(err)
    );
  }

  addComment() {
    let _dialogRef = this._dialog.open(TicketCommentsComponent, {
      data: {
        ticketNumber: this.ticketNumber,
        userCode: this.tokenPayload.user,
        action: this.step,
        module: '3',
      },
      width: '720px',
    });

    _dialogRef.afterClosed().subscribe((result) => {
      this.dialogRef.close('true');
    });
  }
}
