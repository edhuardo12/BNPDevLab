import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { unique } from 'jquery';
import { ApiService } from 'src/app/services/api.service';
import { AdminSubRegistComponent } from '../events/admin-sub-regist/admin-sub-regist.component';

@Component({
  selector: 'app-historico-analista',
  templateUrl: './historico-analista.component.html',
  styleUrls: ['./historico-analista.component.css'],
})
export class HistoricoAnalistaComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  arrayData!: any;
  datatable = false;
  constructor(public dialog: MatDialog, public uApi: ApiService) {}

  ngOnInit(): void {
    this.arrayData = [];
    this.dtOptions = {
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.openSubRegistros(data);
        });
        return row;
      },
    };
    this.callCurrentUserTickets();
  }

  openSubRegistros(uniqueKey: any) {
    localStorage.setItem('uniqueKeyValue', uniqueKey[1]);
    let row_status = uniqueKey[4];
    if (row_status == 'EXCLUIDO') {
      let dialogRef = this.dialog.open(AdminSubRegistComponent, {
        data: { currentUniqueKey: uniqueKey[1], mode: '2' },
      });
    } else {
      let dialogRef = this.dialog.open(AdminSubRegistComponent, {
        data: { currentUniqueKey: uniqueKey[1], mode: '3' },
      });
    }
  }

  callCurrentUserTickets() {
    let username = localStorage.getItem('username');
    this.uApi.callGetExecute('20', username || '').subscribe((res) => {
      this.arrayData = res;
      this.datatable = true;
    });
  }
}
