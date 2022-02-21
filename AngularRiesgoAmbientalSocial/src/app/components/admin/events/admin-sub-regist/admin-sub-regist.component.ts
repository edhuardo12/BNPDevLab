import { Component, Inject, OnInit, Optional, Renderer2 } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommentDialogComponent } from 'src/app/components/Events/comment-dialog/comment-dialog.component';
import { ApiService } from 'src/app/services/api.service';

export interface requestData {
  currentUniqueKey: string;
  mode: string;
}

@Component({
  selector: 'app-admin-sub-regist',
  templateUrl: './admin-sub-regist.component.html',
  styleUrls: ['./admin-sub-regist.component.css'],
})
export class AdminSubRegistComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  arrayData!: any;
  faseAprovacion = false;
  faseInclusion = false;
  datatable = false;
  habilitarRegistro = false;
  isDecision = true;
  constructor(
    public dialogRef: MatDialogRef<AdminSubRegistComponent>,
    public renderer: Renderer2,
    public router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public uApi: ApiService,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: requestData
  ) {}

  ngOnInit(): void {
    this.dtOptions = {};
    this.callSubTickets();
  }

  callSubTickets() {
    this.uApi
      .getCurrentSubTickets(this.data.currentUniqueKey)
      .subscribe((res) => {
        this.arrayData = res;
        this.datatable = true;
        this.getTableMode();
      });
  }

  doSomethingWithBotton(option: any, code: any, data: any) {
    localStorage.setItem('form_code', code || '');
    if (data == 'CLA') {
      this.router.navigate(['/administration/adm-clasification-view']);
      this.closeDialog();
    } else if (data == 'GEN') {
      this.router.navigate(['/administration/adm-general-view']);
      this.closeDialog();
    } else if (data == 'SEG') {
      this.router.navigate(['/administration/adm-SEG-view']);
      this.closeDialog();
    } else {
      this.showForm(data);
    }
  }

  showForm(form: any) {
    let dir = '/administration/adm-' + form + '-view';
    this.router.navigate([dir]);
    this.closeDialog();
  }

  getTableMode() {
    if (this.data.mode == '1') {
      this.faseAprovacion = true;
    } else if (this.data.mode == '2') {
      this.faseAprovacion = false;
      this.faseInclusion = true;
    } else {
      this.faseAprovacion = false;
      this.faseInclusion = false;
    }
  }

  openNewComment(opcion: any) {
    let dialogRef = this.dialog.open(CommentDialogComponent);

    dialogRef.afterClosed().subscribe((results) => {
      let msg = results.event;
      this.callPostDecition(opcion, msg);
      this.ngOnInit();
    });
  }

  getRegistStatus() {
    this.uApi
      .callGetExecute('11', this.data.currentUniqueKey)
      .subscribe((res) => {
        let status = res[0].status;
        if (status == 'EN REVISION') {
          this.isDecision = true;
        } else {
          this.isDecision = false;
        }

        if (status == 'EXCLUSIÓN') {
          this.habilitarRegistro = true;
        } else {
          this.habilitarRegistro = false;
        }
      });
  }

  doAction(decision: string) {
    this.dialogRef.close({ event: decision });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  callPostDecition(opcion: any, message: any) {
    if (opcion == '1') {
      let dataArray = {
        opcion: '13',
        SQLStr:
          localStorage.getItem('uniqueKeyValue') +
          ',' +
          'CORRECCIÓN' +
          ',' +
          localStorage.getItem('username') +
          ',' +
          message,
      };
      this.uApi.callPostExecute(dataArray).subscribe((res) => {
        this._snackBar.open('Estatus del registro actualizado!', 'Cerrar', {
          duration: 3 * 1000,
        });
      });
    } else if (opcion == '2') {
      let dataArray = {
        opcion: '13',
        SQLStr:
          localStorage.getItem('uniqueKeyValue') +
          ',' +
          'EVALUADO' +
          ',' +
          localStorage.getItem('username') +
          ',' +
          message,
      };
      this.uApi.callPostExecute(dataArray).subscribe((res) => {
        this._snackBar.open('Estatus del registro actualizado!', 'Cerrar', {
          duration: 3 * 1000,
        });
      });
    } else if (opcion == '3') {
      let dataArray = {
        opcion: '13',
        SQLStr:
          localStorage.getItem('uniqueKeyValue') +
          ',' +
          'NO APLICA' +
          ',' +
          localStorage.getItem('username') +
          ',' +
          message,
      };
      this.uApi.callPostExecute(dataArray).subscribe((res) => {
        this._snackBar.open('Estatus del registro actualizado!', 'Cerrar', {
          duration: 3 * 1000,
        });
      });
    } else if (opcion == '4') {
      let dataArray = {
        opcion: '13',
        SQLStr:
          localStorage.getItem('uniqueKeyValue') +
          ',' +
          'INICIADO' +
          ',' +
          localStorage.getItem('username') +
          ',' +
          message,
      };
      this.uApi.callPostExecute(dataArray).subscribe((res) => {
        this._snackBar.open('Estatus del registro actualizado!', 'Cerrar', {
          duration: 3 * 1000,
        });
      });
    }
    this.router.navigate(['/administration/historico']);
    this.closeDialog();
  }
}
