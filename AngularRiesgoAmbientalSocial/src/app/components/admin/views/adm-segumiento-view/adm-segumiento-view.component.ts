import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clasification } from 'src/app/components/Class/clasification';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentDialogComponent } from 'src/app/components/Events/comment-dialog/comment-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-adm-segumiento-view',
  templateUrl: './adm-segumiento-view.component.html',
  styleUrls: ['./adm-segumiento-view.component.css'],
  providers: [Clasification],
})
export class AdmSegumientoViewComponent implements OnInit {
  formularioFormGroup!: FormGroup;
  arrayData!: any;
  formCode!: any;
  isDesicion = false;
  constructor(
    public uApi: ApiService,
    public _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public router: Router,
    private _snackBar: MatSnackBar,
    private _clasificacion: Clasification
  ) {}

  ngOnInit(): void {
    this.formCode = localStorage.getItem('form_code');
    this.uApi.callGetExecute('23', this.formCode || '').subscribe((res) => {
      this.arrayData = res[0];
      this.getIniFormGroup();
      this.getRegistStatus();
      this.turnEdition('1');
    });
  }

  getIniFormGroup() {
    this.formularioFormGroup = this._formBuilder.group({
      segData01: [this.arrayData.niver_riesgo_AS],
      segData02: [this.arrayData.tota_expo_grupo],
      segData03: [this.arrayData.rating_AS],
      segData04: [this.arrayData.sector],
      segData05: [this.arrayData.subsector],
      segData06: [this.arrayData.actividad_cliente_manual],
      segData07: [this.arrayData.niver_riesgo_manual_AS],
      segData08: [this.arrayData.checklist_campo_1],
      segData09: [this.arrayData.checklist_campo_2],
      segData10: [this.arrayData.checklist_campo_3],
      segData11: [this.arrayData.checklist_campo_4],
      segData12: [this.arrayData.checklist_campo_5],
      segData13: [this.arrayData.checklist_campo_6],
      segData14: [this.arrayData.checklist_campo_7],
      segData15: [this.arrayData.checklist_campo_8],
      segData16: [this.arrayData.checklist_campo_9],
      segData17: [this.arrayData.ventas_anuales],
      segData18: [this.arrayData.total_expo_banco],
      segData19: [this.arrayData.complimento_cov_01],
      segData20: [this.arrayData.complimento_cov_02],
      segData21: [this.arrayData.complimento_cov_03],
      segData22: [this.arrayData.complimento_cov_04],
      segData23: [this.arrayData.complimento_cov_05],
      segData24: [this.arrayData.complimento_cov_06],
      segData25: [this.arrayData.complimento_cov_07],
      segData26: [this.arrayData.complimento_cov_08],
      segData27: [this.arrayData.complimento_cov_09],
      segData28: [this.arrayData.complimento_cov_10],
    });
  }

  callPostDecition(opcion: any, message: any) {
    if (opcion == '1') {
      let dataArray = {
        opcion: '7',
        SQLStr:
          localStorage.getItem('uniqueKeyValue') +
          ',' +
          'CORRECCIÓN' +
          ',' +
          this.formCode +
          ',' +
          localStorage.getItem('username') +
          ',' +
          message,
      };
      this.uApi.callPostExecute(dataArray).subscribe((res) => {
        this._snackBar.open('Estatus del formulario actualizado!', 'Cerrar', {
          duration: 3 * 1000,
        });
        this.router.navigate(['/administration/listAdmin']);
      });
    } else if (opcion == '2') {
      let dataArray = {
        opcion: '7',
        SQLStr:
          localStorage.getItem('uniqueKeyValue') +
          ',' +
          'EVALUADO' +
          ',' +
          this.formCode +
          ',' +
          localStorage.getItem('username') +
          ',' +
          message,
      };
      this.uApi.callPostExecute(dataArray).subscribe((res) => {
        this._snackBar.open('Estatus del formulario actualizado!', 'Cerrar', {
          duration: 3 * 1000,
        });
        this.router.navigate(['/administration/listAdmin']);
      });
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

  getSubSector(event: any) {
    this._clasificacion.subsector = event.value;
  }

  turnEdition(option: any) {
    if (option == '1') {
      Object.keys(this.formularioFormGroup.controls).forEach((key) => {
        this.formularioFormGroup.controls[key].disable();
      });
    }
  }

  closeForm() {
    this.router.navigate(['/administration/listAdmin']);
  }
  getRegistStatus() {
    this.uApi.callGetExecute('16', this.formCode || '').subscribe((res) => {
      let status = res[0];
      if (status.state == 'EN REVISIÓN') {
        this.isDesicion = true;
      } else {
        this.isDesicion = false;
      }
    });
  }
}
