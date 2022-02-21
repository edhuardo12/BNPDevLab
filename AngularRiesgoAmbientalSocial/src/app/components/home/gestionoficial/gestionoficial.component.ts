import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ClientManagementComponent } from '../../Events/client-management/client-management.component';
import { NewRegisterComponent } from '../../Events/new-register/new-register.component';
import { SubregistrosComponent } from '../../Events/subregistros/subregistros.component';

@Component({
  selector: 'app-gestionoficial',
  templateUrl: './gestionoficial.component.html',
  styleUrls: ['./gestionoficial.component.css'],
})
export class GestionoficialComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  arrayData!: any;
  datatable = false;

  constructor(
    public dialog: MatDialog,
    public uApi: ApiService,
    public route: Router
  ) {}

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
    let dialogRef = this.dialog.open(SubregistrosComponent, {
      data: { currentUniqueKey: uniqueKey[1] },
    });

    dialogRef.backdropClick().subscribe(() => {
      location.reload();
    });

    dialogRef.afterClosed().subscribe((results) => {
      let callResult = results.event;
      if (callResult == 'reload') {
        location.reload();
      }
    });
  }

  generateNewRegister() {
    let dialogReg = this.dialog.open(NewRegisterComponent);

    dialogReg.afterClosed().subscribe((results) => {
      location.reload();
    });
  }

  managementClient() {
    let dialogReg = this.dialog.open(ClientManagementComponent, {
      width: '720px',
      data: { title: 'Mantenimiento de Clientes / Registros', content: '' },
    });

    dialogReg.afterClosed().subscribe((results) => {
      location.reload();
    });
  }

  callCurrentUserTickets() {
    let username = localStorage.getItem('username');
    this.uApi.getCurrenUsersTickets(username || '').subscribe((res) => {
      this.arrayData = res;
      this.datatable = true;
    });
  }
}
