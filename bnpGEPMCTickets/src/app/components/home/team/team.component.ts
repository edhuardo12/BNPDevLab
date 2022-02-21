import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  constructor(private _uapi: ApiService, private _auth: AuthService) {}

  users: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  tokenPayload!: any;
  userName!: any;
  userCode!: any;

  ngOnInit() {
    this.tokenPayload = this._auth.getTokenPayload();
    this.dtOptions = {
      searching: false,
      paging: false,
      info: false,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.getMyWorkLoad(data);
        });
        return row;
      },
    };
    this.getMyWorkTeam();
  }

  getMyWorkLoad(data: any) {
    this.userName = data[1];
    this.userCode = data[0];
  }

  getMyWorkTeam() {
    this._uapi.callGetExecute('4', this.tokenPayload.user).subscribe((res) => {
      this.users = res;
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
