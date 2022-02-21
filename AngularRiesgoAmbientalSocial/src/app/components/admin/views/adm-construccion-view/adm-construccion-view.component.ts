import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommentDialogComponent } from 'src/app/components/Events/comment-dialog/comment-dialog.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-adm-construccion-view',
  templateUrl: './adm-construccion-view.component.html',
  styleUrls: ['./adm-construccion-view.component.css'],
})
export class AdmConstruccionViewComponent implements OnInit {
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
    this.uApi.callGetExecute('19', this.formCode || '').subscribe((res) => {
      this.arrayData = res[0];
      this.getIniFormGroup();
      this.getRegistStatus();
    });
  }

  getIniFormGroup() {
    this.formularioFormGroup = this._formBuilder.group({
      customer01Ctrl: [
        this.arrayData.zona_habitacional,
        [Validators.maxLength(100)],
      ],
      customer02Ctrl: [
        this.arrayData.area_protegida,
        [Validators.maxLength(100)],
      ],
      customer03Ctrl: [
        this.arrayData.superficie_terreno,
        [Validators.maxLength(100)],
      ],
      customer04Ctrl: [
        this.arrayData.dimension_total,
        [Validators.maxLength(100)],
      ],
      customer05Ctrl: [this.arrayData.tipo_bienes, [Validators.maxLength(100)]],

      legisPerm01Ctrl: [
        this.arrayData.legis_perm_01,
        [Validators.maxLength(100)],
      ],
      legisPerm01expCtrl: [
        this.arrayData.legis_perm_exp_01,
        [Validators.maxLength(100)],
      ],

      legisPerm02Ctrl: [
        this.arrayData.legis_perm_02,
        [Validators.maxLength(100)],
      ],
      legisPerm02expCtrl: [
        this.arrayData.legis_perm_exp_02,
        [Validators.maxLength(100)],
      ],

      suelo01Ctrl: [this.arrayData.suelo_01, [Validators.maxLength(100)]],
      suelo01expCtrl: [
        this.arrayData.suelo_exp_01,
        [Validators.maxLength(100)],
      ],

      suelo02Ctrl: [this.arrayData.suelo_02, [Validators.maxLength(100)]],
      suelo02expCtrl: [
        this.arrayData.suelo_exp_02,
        [Validators.maxLength(100)],
      ],

      suelo03Ctrl: [this.arrayData.suelo_03, [Validators.maxLength(100)]],
      suelo03expCtrl: [
        this.arrayData.suelo_exp_03,
        [Validators.maxLength(100)],
      ],

      desastreNat01Ctrl: [
        this.arrayData.desastre_nat_01,
        [Validators.maxLength(100)],
      ],
      desastreNat01expCtrl: [
        this.arrayData.desastre_nat_exp_01,
        [Validators.maxLength(100)],
      ],

      desastreNat02Ctrl: [
        this.arrayData.desastre_nat_02,
        [Validators.maxLength(100)],
      ],
      desastreNat02expCtrl: [
        this.arrayData.desastre_nat_exp_02,
        [Validators.maxLength(100)],
      ],

      desastreNat03Ctrl: [
        this.arrayData.desastre_nat_03,
        [Validators.maxLength(100)],
      ],
      desastreNat03expCtrl: [
        this.arrayData.desastre_nat_exp_03,
        [Validators.maxLength(100)],
      ],

      desastreNat04Ctrl: [
        this.arrayData.desastre_nat_04,
        [Validators.maxLength(100)],
      ],
      desastreNat04expCtrl: [
        this.arrayData.desastre_nat_exp_04,
        [Validators.maxLength(100)],
      ],

      residuos01Ctrl: [this.arrayData.residuos_01, [Validators.maxLength(100)]],
      residuos01expCtrl: [
        this.arrayData.residuos_exp_01,
        [Validators.maxLength(100)],
      ],

      residuos02Ctrl: [this.arrayData.residuos_02, [Validators.maxLength(100)]],
      residuos02expCtrl: [
        this.arrayData.residuos_exp_02,
        [Validators.maxLength(100)],
      ],

      emisionesRuido01Ctrl: [
        this.arrayData.emisiones_ruido_01,
        [Validators.maxLength(100)],
      ],
      emisionesRuido01expCtrl: [
        this.arrayData.emisiones_ruido_exp_01,
        [Validators.maxLength(100)],
      ],

      emisionesRuido02Ctrl: [
        this.arrayData.emisiones_ruido_02,
        [Validators.maxLength(100)],
      ],
      emisionesRuido02expCtrl: [
        this.arrayData.emisiones_ruido_exp_02,
        [Validators.maxLength(100)],
      ],

      emisionesRuido03Ctrl: [
        this.arrayData.emisiones_ruido_03,
        [Validators.maxLength(100)],
      ],
      emisionesRuido03expCtrl: [
        this.arrayData.emisiones_ruido_exp_03,
        [Validators.maxLength(100)],
      ],

      higiene01Ctrl: [this.arrayData.higiene_01, [Validators.maxLength(100)]],
      higiene01expCtrl: [
        this.arrayData.higiene_exp_01,
        [Validators.maxLength(100)],
      ],

      higiene02Ctrl: [this.arrayData.higiene_02, [Validators.maxLength(100)]],
      higiene02expCtrl: [
        this.arrayData.higiene_exp_02,
        [Validators.maxLength(100)],
      ],

      higiene03Ctrl: [this.arrayData.higiene_03, [Validators.maxLength(100)]],
      higiene03expCtrl: [
        this.arrayData.higiene_exp_03,
        [Validators.maxLength(100)],
      ],

      higiene04Ctrl: [this.arrayData.higiene_04, [Validators.maxLength(100)]],
      higiene04expCtrl: [
        this.arrayData.higiene_exp_04,
        [Validators.maxLength(100)],
      ],

      shmt01Ctrl: [this.arrayData.shmt_01, [Validators.maxLength(100)]],
      shmt01expCtrl: [this.arrayData.shmt_exp_01, [Validators.maxLength(100)]],

      shmt02Ctrl: [this.arrayData.shmt_02, [Validators.maxLength(100)]],
      shmt02expCtrl: [this.arrayData.shmt_exp_02, [Validators.maxLength(100)]],

      shmt03Ctrl: [this.arrayData.shmt_03, [Validators.maxLength(100)]],
      shmt03expCtrl: [this.arrayData.shmt_exp_03, [Validators.maxLength(100)]],

      shmt04Ctrl: [this.arrayData.shmt_04, [Validators.maxLength(100)]],
      shmt04expCtrl: [this.arrayData.shmt_exp_04, [Validators.maxLength(100)]],

      comunidad01Ctrl: [
        this.arrayData.comunidad_01,
        [Validators.maxLength(100)],
      ],
      comunidad01expCtrl: [
        this.arrayData.comunidad_exp_01,
        [Validators.maxLength(100)],
      ],

      comunidad02Ctrl: [
        this.arrayData.comunidad_02,
        [Validators.maxLength(100)],
      ],
      comunidad02expCtrl: [
        this.arrayData.comunidad_exp_02,
        [Validators.maxLength(100)],
      ],

      comunidad03Ctrl: [
        this.arrayData.comunidad_03,
        [Validators.maxLength(100)],
      ],
      comunidad03expCtrl: [
        this.arrayData.comunidad_exp_03,
        [Validators.maxLength(100)],
      ],

      comunidad04Ctrl: [
        this.arrayData.comunidad_04,
        [Validators.maxLength(100)],
      ],
      comunidad04expCtrl: [
        this.arrayData.comunidad_exp_04,
        [Validators.maxLength(100)],
      ],

      ppgc01Ctrl: [this.arrayData.ppgc_01, [Validators.maxLength(100)]],
      ppgc01expCtrl: [this.arrayData.ppgc_exp_01, [Validators.maxLength(100)]],

      ppgc02Ctrl: [this.arrayData.ppgc_02, [Validators.maxLength(100)]],
      ppgc02expCtrl: [this.arrayData.pggc_exp_02, [Validators.maxLength(100)]],

      ppgc03Ctrl: [this.arrayData.pggc_03, [Validators.maxLength(100)]],
      ppgc03expCtrl: [this.arrayData.pggc_exp_03, [Validators.maxLength(100)]],

      ppgc04Ctrl: [this.arrayData.pggc_04, [Validators.maxLength(100)]],
      ppgc04expCtrl: [this.arrayData.pggc_exp_04, [Validators.maxLength(100)]],

      ppgc05Ctrl: [this.arrayData.pggc_05, [Validators.maxLength(100)]],
      ppgc05expCtrl: [this.arrayData.pggc_exp_05, [Validators.maxLength(100)]],

      ppgc06Ctrl: [this.arrayData.pggc_06, [Validators.maxLength(100)]],
      ppgc06expCtrl: [this.arrayData.pggc_exp_06, [Validators.maxLength(100)]],

      ppgc07Ctrl: [this.arrayData.pggc_07, [Validators.maxLength(100)]],
      ppgc07expCtrl: [this.arrayData.pggc_exp_07, [Validators.maxLength(100)]],

      ppgc08Ctrl: [this.arrayData.pggc_08, [Validators.maxLength(100)]],
      ppgc08expCtrl: [this.arrayData.pggc_exp_08, [Validators.maxLength(100)]],

      ppgc09Ctrl: [this.arrayData.pggc_09, [Validators.maxLength(100)]],
      ppgc09expCtrl: [this.arrayData.pggc_exp_09, [Validators.maxLength(100)]],

      conclusion: [this.arrayData.conclusion, [Validators.maxLength(256)]],
      recomendacion: [
        this.arrayData.recomendacion,
        [Validators.maxLength(256)],
      ],
    });
    this.turnEdition('1');
  }

  turnEdition(option: any) {
    if (option == '1') {
      Object.keys(this.formularioFormGroup.controls).forEach((key) => {
        this.formularioFormGroup.controls[key].disable();
      });
    }
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
