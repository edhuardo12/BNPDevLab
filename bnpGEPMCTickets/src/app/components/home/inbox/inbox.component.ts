import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketDetail } from 'src/app/interfaces/ticket-detail';
import { ApiService } from 'src/app/services/api.service';
import { AssignmentComponent } from './assignment/assignment.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent implements OnInit {
  ticketDetail!: TicketDetail;
  arrayDataTable!: any;
  dtOptions: any = {};
  showTable = false;
  constructor(private _uapi: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUnassingedTicketData();
  }

  iniDataTable() {
    this.dtOptions = {
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: ['copy', 'print', 'excel'],
      responsive: true,
    };
    this.showTable = true;
  }

  getUnassingedTicketData() {
    this._uapi.callGetExecute('2', '').subscribe((res) => {
      this.arrayDataTable = res;
      this.iniDataTable();
    });
  }

  AssignTicket(data: any) {
    this._uapi.callGetExecute('3', data).subscribe((res) => {
      this.ticketDetail = res[0];
      this.openAssigmentDialog();
    });
  }

  openAssigmentDialog() {
    let dialogRef = this.dialog.open(AssignmentComponent, {
      data: { ticketDetail: this.ticketDetail },
      width: '720px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result == 'true') {
        location.reload();
      }
    });
  }

  EditTicketData(data: any) {
    this._uapi.callGetExecute('3', data).subscribe((res) => {
      this.ticketDetail = res[0];
      this.openEditTicketDataDialog();
    });
  }

  openEditTicketDataDialog() {
    let dialogRef = this.dialog.open(EditTicketComponent, {
      data: { ticketDetail: this.ticketDetail },
      width: '1024px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result == 'true') {
      }
    });
  }
}
