import { Component, Inject, OnInit, Optional, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

export interface requestData {
  currentUniqueKey: string;
}

@Component({
  selector: 'app-subregistros',
  templateUrl: './subregistros.component.html',
  styleUrls: ['./subregistros.component.css'],
})
export class SubregistrosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  arrayData!: any;
  datatable = false;
  enviarEvaluacion = true;
  isPrint = true;

  constructor(
    public dialogRef: MatDialogRef<SubregistrosComponent>,
    public renderer: Renderer2,
    public router: Router,
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
        this.getRegistStatus();
      });
  }

  getRegistStatus() {
    this.uApi
      .callGetExecute('11', this.data.currentUniqueKey)
      .subscribe((res) => {
        let status = res[0].status;
        if (status == 'INICIADO' || status == 'CORRECCIÓN') {
          this.enviarEvaluacion = true;
          this.isPrint = false;
        } else if (status == 'EVALUADO') {
          this.enviarEvaluacion = false;
          this.isPrint = true;
        } else {
          this.enviarEvaluacion = false;
          this.isPrint = false;
        }
      });
  }

  doSendtoEvaluation() {
    let dataArray = {
      opcion: '4',
      SQLStr:
        this.data.currentUniqueKey +
        ',' +
        'EN REVISIÓN' +
        ',' +
        localStorage.getItem('username'),
    };
    this.uApi.callPostExecute(dataArray).subscribe((res) => {
      this.router.navigate(['/home']);
      this.closeDialog('reload');
    });
  }

  doSomethingWithBotton(option: any, code: any, data: any) {
    localStorage.setItem('form_code', code || '');

    if (data == 'CLA') {
      this.router.navigate(['/home/clasificacion-view']);
      this.closeDialog('stay');
    } else if (data == 'GEN') {
      this.router.navigate(['/home/general-view']);
      this.closeDialog('stay');
    } else if (data == 'SEG') {
      this.router.navigate(['/home/SEG-view']);
      this.closeDialog('stay');
    } else {
      this.showForm(data);
    }
  }

  imprimirForm(option: any, code: any, data: any) {
    localStorage.setItem('form_code', code || '');
    if (data == 'CLA') {
      let href = '/print/clasificacion';
      this.router.navigate([href]);
      this.closeDialog('stay');
    } else if (data == 'GEN') {
      let href = '/print/general';
      this.router.navigate([href]);
      this.closeDialog('stay');
    } else if (data == 'SEG') {
      this.router.navigate(['/print/seguimiento']);
      this.closeDialog('stay');
    } else {
      let dir = '/print/' + data + '-print';
      this.router.navigate([dir]);
      this.closeDialog('stay');
    }
  }

  showForm(form: any) {
    let dir = '/home/' + form + '-view';
    this.router.navigate([dir]);
    this.closeDialog('stay');
  }

  closeDialog(opcion: string) {
    this.dialogRef.close({ event: opcion });
  }
}
