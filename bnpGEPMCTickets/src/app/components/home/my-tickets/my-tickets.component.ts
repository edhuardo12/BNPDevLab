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
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service'; 
import { AuthService } from 'src/app/services/auth.service'; 

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css'],
})
export class MyTicketsComponent
  implements OnChanges, AfterViewInit, OnDestroy, OnInit
{
  @Input() userCode: any;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  constructor(private _uapi: ApiService, private _auth: AuthService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userCode != undefined) {
      this.getMyWorkLoad(this.userCode);
    }
  }

  tickets: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  tokenPayload!: any;

  ngOnInit(): void {
    this.tokenPayload = this._auth.getTokenPayload();
    this.dtOptions = {
      searching: true,
      paging: true,
      info: true,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {});
        return row;
      },
    };
    this.getMyWorkLoad(this.tokenPayload.user);
  }

  getMyWorkLoad(code: any) {
    this._uapi.callGetExecute('5', code).subscribe((res) => {
      this.tickets = res;
      this.rerender();
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
