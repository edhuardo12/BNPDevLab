import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AdminSubRegistComponent } from '../events/admin-sub-regist/admin-sub-regist.component';

@Component({
  selector: 'app-gestion-analista',
  templateUrl: './gestion-analista.component.html',
  styleUrls: ['./gestion-analista.component.css'],
})
export class GestionAnalistaComponent implements OnInit {
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
    let dialogRef = this.dialog.open(AdminSubRegistComponent, {
      data: { currentUniqueKey: uniqueKey[1], mode: '1' },
    });

    dialogRef.backdropClick().subscribe(() => {
      location.reload();
    });

    dialogRef.afterClosed().subscribe((results) => {
      console.log('OK');
    });
  }

  callCurrentUserTickets() {
    let username = localStorage.getItem('username');
    this.uApi.callGetExecute('9', username || '').subscribe((res) => {
      this.arrayData = res;
      this.datatable = true;
    });
  }
}
