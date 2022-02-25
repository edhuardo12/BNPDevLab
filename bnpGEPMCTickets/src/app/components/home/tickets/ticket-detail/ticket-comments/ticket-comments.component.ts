import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ticket-comments',
  templateUrl: './ticket-comments.component.html',
  styleUrls: ['./ticket-comments.component.css'],
})
export class TicketCommentsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TicketCommentsComponent>,
    private _sb: MatSnackBar,
    private fb: FormBuilder,
    public uApi: ApiService,

    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ticketNumber: any;
      userCode: any;
      action: any;
      module: any;
    }
  ) {}

  ticketNumber!: any;
  confirmClose!: any;

  ngOnInit(): void {
    this.ticketNumber = this.data.ticketNumber;
    this.confirmClose = false;
  }

  ticketNewComment = this.fb.group({
    comentarios: null,
    actionClose: this.confirmClose,
  });

  getCloseConfirm(value: any) {
    this.confirmClose = value;
  }

  onSubmit(): void {
    this._sb.open('Un momento por favor...', 'OK');
    let dataArray = {
      option: '4',
      _ticketNumber: this.data.ticketNumber,
      _step: this.data.action,
      _userCode: this.data.userCode,
      _comment: this.ticketNewComment.controls['comentarios'].value,
      _closeAction: this.confirmClose,
    };

    this.uApi.callPostComments(dataArray).subscribe(
      (res) => {
        this.dialogRef.close('true');
        this._sb.open('Listo', 'OK', { duration: 3000 });
      },
      (err) => {
        console.log(err),
          this._sb.open('Error', 'Entendido', { duration: 3000 });
      }
    );
  }
}
