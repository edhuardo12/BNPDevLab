import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommentDialogComponent } from 'src/app/components/Events/comment-dialog/comment-dialog.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-adm-industrial-view',
  templateUrl: './adm-industrial-view.component.html',
  styleUrls: ['./adm-industrial-view.component.css'],
})
export class AdmIndustrialViewComponent implements OnInit {
  formularioFormGroup!: FormGroup;
  arrayData!: any;
  formCode!: any;
  isDesicion = false;
  constructor(
    public uApi: ApiService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formCode = localStorage.getItem('form_code');
    this.uApi.callGetExecute('12', this.formCode || '').subscribe((res) => {
      this.arrayData = res[0];
      this.getIniFormGroup();
      this.getRegistStatus();
    });
  }

  getIniFormGroup() {
    this.formularioFormGroup = this._formBuilder.group({
      nomUnidInduCtrl: [this.arrayData.nombre_unidad],
      dimencionTotalCtrl: [
        this.arrayData.dimesion_total,
        [Validators.pattern('/^[+-]?([0-9]+.?[0-9]*|.[0-9]+)$/')],
      ],
      dimecionOcupadaCtrl: [
        this.arrayData.dimesion_ocupada,
        [Validators.pattern('/^[+-]?([0-9]+.?[0-9]*|.[0-9]+)$/')],
      ],
      estadoPropCtrl: [this.arrayData.estado_propiedad],
      zonaHabiCtrl: [this.arrayData.zona_habitacional],
      areaProtegiCtrl: [this.arrayData.area_protegida],
      caracteristicasEspCtrl: [
        this.arrayData.caracteristica_especifica,
        [Validators.maxLength(750)],
      ],
      nomComQuiCtrl: [this.arrayData.nombre_com_quimi],
      estadoFisicoCtrl: [this.arrayData.estado_fisico],
      consumoMensAproxCtrl: [this.arrayData.consumo_mensual],

      legisPerm01Ctrl: [this.arrayData.legis_perm_01],
      legisPerm01expCtrl: [this.arrayData.legis_perm_01_exp],

      legisPerm02Ctrl: [this.arrayData.legis_perm_02],
      legisPerm02expCtrl: [this.arrayData.legis_perm_02_exp],

      maneMiti01Ctrl: [this.arrayData.mane_miti_01],
      maneMiti01expCtrl: [this.arrayData.mane_miti_01_exp],

      maneMiti02Ctrl: [this.arrayData.mane_miti_02],
      maneMiti02expCtrl: [this.arrayData.mane_miti_02_exp],

      maneMiti03Ctrl: [this.arrayData.mane_miti_03],
      maneMiti03expCtrl: [this.arrayData.mane_miti_03_exp],

      maneMiti04Ctrl: [this.arrayData.mane_miti_04],
      maneMiti04expCtrl: [this.arrayData.mane_miti_04_exp],

      maneMiti05Ctrl: [this.arrayData.mane_miti_05],
      maneMiti05expCtrl: [this.arrayData.mane_miti_05_exp],

      maneMiti06Ctrl: [this.arrayData.mane_miti_06],
      maneMiti06expCtrl: [this.arrayData.mane_miti_06_exp],

      maneMiti07Ctrl: [this.arrayData.mane_miti_07],
      maneMiti07expCtrl: [this.arrayData.mane_miti_07_exp],

      maneMiti08Ctrl: [this.arrayData.mane_miti_08],
      maneMiti08expCtrl: [this.arrayData.mane_miti_08_exp],

      maneMiti09Ctrl: [this.arrayData.mane_miti_09],
      maneMiti09expCtrl: [this.arrayData.mane_miti_09_exp],

      maneMiti10Ctrl: [this.arrayData.mane_miti_10],
      maneMiti10expCtrl: [this.arrayData.mane_miti_10_exp],

      maneMiti11Ctrl: [this.arrayData.mane_miti_11],
      maneMiti11expCtrl: [this.arrayData.mane_miti_11_exp],

      maneMiti12Ctrl: [this.arrayData.mane_miti_12],
      maneMiti12expCtrl: [this.arrayData.mane_miti_12_exp],

      maneMiti13Ctrl: [this.arrayData.mane_miti_13],
      maneMiti13expCtrl: [this.arrayData.mane_miti_13_exp],

      maneMiti14Ctrl: [this.arrayData.mane_miti_14],
      maneMiti14expCtrl: [this.arrayData.mane_miti_14_exp],

      maneMiti15Ctrl: [this.arrayData.mane_miti_15],
      maneMiti15expCtrl: [this.arrayData.mane_miti_15_exp],

      maneMiti16Ctrl: [this.arrayData.mane_miti_16],
      maneMiti16expCtrl: [this.arrayData.mane_miti_16_exp],

      maneMiti17Ctrl: [this.arrayData.mane_miti_17],
      maneMiti17expCtrl: [this.arrayData.mane_miti_17_exp],

      maneMiti18Ctrl: [this.arrayData.mane_miti_18],
      maneMiti18expCtrl: [this.arrayData.mane_miti_18_exp],

      maneMiti19Ctrl: [this.arrayData.mane_miti_19],
      maneMiti19expCtrl: [this.arrayData.mane_miti_19_exp],

      maneMiti20Ctrl: [this.arrayData.mane_miti_20],
      maneMiti20expCtrl: [this.arrayData.mane_miti_20_exp],

      maneMiti21Ctrl: [this.arrayData.mane_miti_21],
      maneMiti21expCtrl: [this.arrayData.mane_miti_21_exp],

      ppgc01Ctrl: [this.arrayData.ppgc_01],
      ppgc01expCtrl: [this.arrayData.ppgc_01_exp],

      ppgc02Ctrl: [this.arrayData.ppgc_02],
      ppgc02expCtrl: [this.arrayData.ppgc_02_exp],

      ppgc03Ctrl: [this.arrayData.ppgc_03],
      ppgc03expCtrl: [this.arrayData.ppgc_03_exp],

      ppgc04Ctrl: [this.arrayData.ppgc_04],
      ppgc04expCtrl: [this.arrayData.ppgc_04_exp],

      ppgc05Ctrl: [this.arrayData.ppgc_05],
      ppgc05expCtrl: [this.arrayData.ppgc_05_exp],

      ppgc06Ctrl: [this.arrayData.ppgc_06],
      ppgc06expCtrl: [this.arrayData.ppgc_06_exp],

      ppgc07Ctrl: [this.arrayData.ppgc_07],
      ppgc07expCtrl: [this.arrayData.ppgc_07_exp],

      ppgc08Ctrl: [this.arrayData.ppgc_08],
      ppgc08expCtrl: [this.arrayData.ppgc_08_exp],

      ppgc09Ctrl: [this.arrayData.ppgc_09],
      ppgc09expCtrl: [this.arrayData.ppgc_09_exp],

      ppgc10Ctrl: [this.arrayData.ppgc_10],
      ppgc10expCtrl: [this.arrayData.ppgc_10_exp],

      ppgc11Ctrl: [this.arrayData.ppgc_11],
      ppgc11expCtrl: [this.arrayData.ppgc_11_exp],

      conclusionesCtrl: [
        this.arrayData.conclusion,
        [Validators.maxLength(256)],
      ],
      recomendacionesCtrl: [
        this.arrayData.recomendacion,
        [Validators.maxLength(256)],
      ],
    });
    this.turnEdition(1);
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
