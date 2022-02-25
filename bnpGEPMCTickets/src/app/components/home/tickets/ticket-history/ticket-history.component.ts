import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.css'],
})
export class TicketHistoryComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TicketHistoryComponent>,
    public uApi: ApiService,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ticketNumber: any;
    }
  ) {}

  arrayData!: any;
  dtOptions: any = {};
  showtable = false;

  ticketNumber!: any;

  ngOnInit(): void {
    this.ticketNumber = this.data.ticketNumber;
    this.dtOptions = {
      dom: 'Bfrtip',
      buttons: ['copy', 'print', 'excel'],
      responsive: true,
      searching: true,
      paging: true,
      info: true,
    };
    this.getTicketData(this.data.ticketNumber);
  }

  getTicketData(ticketNumber: string) {
    this.uApi.callGetExecute('10', ticketNumber).subscribe(
      (res) => ((this.arrayData = res), (this.showtable = true)),
      (err) => console.log(err)
    );
  }
}
