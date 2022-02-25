import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
import { TicketHistoryComponent } from '../ticket-history/ticket-history.component';

@Component({
  selector: 'app-ticketstable',
  templateUrl: './ticketstable.component.html',
  styleUrls: ['./ticketstable.component.css'],
})
export class TicketstableComponent
  implements OnChanges, AfterViewInit, OnDestroy, OnInit
{
  @Input() userCode: any;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  constructor(
    private _uapi: ApiService,
    private _auth: AuthService,
    public _dialog: MatDialog
  ) {}

  tickets: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  tokenPayload!: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userCode != undefined) {
      this.getMyWorkLoad(this.userCode);
    }
  }

  ngOnInit(): void {
    this.tokenPayload = this._auth.getTokenPayload();
    this.dtOptions = {
      responsive: true,
      searching: true,
      paging: true,
      info: true,
    };
    this.getMyWorkLoad(this.tokenPayload.user);
  }

  showTicketDetail(data: any) {
    let ticketNumber: string = data;

    let dialogRef = this._dialog.open(TicketDetailComponent, {
      data: { ticketNumber: ticketNumber },
      width: '1024px',
    });

    dialogRef.afterClosed().subscribe(
      (result: string) => {
        this.rerender();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  showTicketHistory(data: any){
    let ticketNumber: string = data;

    let dialogRef = this._dialog.open(TicketHistoryComponent, {
      data: { ticketNumber: ticketNumber },
      width: '1024px',
    });

    dialogRef.afterClosed().subscribe(
      (result: string) => {
        this.rerender();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getMyWorkLoad(code: any) {
    this._uapi.callGetExecute('5', code).subscribe((res) => {
      this.tickets = res;
      this.rerender();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
