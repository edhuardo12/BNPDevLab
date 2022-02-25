import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ticket-comment-actions',
  templateUrl: './ticket-comment-actions.component.html',
  styleUrls: ['./ticket-comment-actions.component.css'],
})
export class TicketCommentActionsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TicketCommentActionsComponent>,
    public uApi: ApiService,

    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ticketNumber: any;
      userCode: any;
      module: any;
    }
  ) {}

  ngOnInit(): void {}
}
