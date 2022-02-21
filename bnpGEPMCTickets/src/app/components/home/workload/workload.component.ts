import {
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { EditTicketComponent } from '../inbox/edit-ticket/edit-ticket.component';
import { TicketDetail } from 'src/app/interfaces/ticket-detail';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-workload',
  templateUrl: './workload.component.html',
  styleUrls: ['./workload.component.css'],
})
export class WorkloadComponent
  implements OnChanges, AfterViewInit, OnDestroy, OnInit
{
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  constructor(
    private _uapi: ApiService,
    private _auth: AuthService,
    public dialog: MatDialog
  ) {}

  tickets: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  tokenPayload!: any;
  ticketDetail!: TicketDetail;

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.tokenPayload = this._auth.getTokenPayload();
    this.dtOptions = {
      searching: true,
      paging: true,
      info: true,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          this.EditTicketData(data);
        });
        return row;
      },
    };
    this.getTicketsDepartment(this.tokenPayload.user);
  }

  getTicketsDepartment(userCode: string) {
    this._uapi.callGetExecute('6', userCode).subscribe((res) => {
      this.tickets = res;
      this.rerender();
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
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      this.getTicketsDepartment(this.tokenPayload.user);
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
