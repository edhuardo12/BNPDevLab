import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ganadero-view',
  templateUrl: './ganadero-view.component.html',
  styleUrls: ['./ganadero-view.component.css'],
})
export class GanaderoViewComponent implements OnInit {
  formularioFormGroup!: FormGroup;
  arrayData!: any;
  formCode!: any;
  editMode = false;
  isEdit = true;
  isSave = false;
  isCerrar = true;
  isCancel = false;
  isDesicion = false;
  constructor(
    public uApi: ApiService,
    private _formBuilder: FormBuilder,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formCode = localStorage.getItem('form_code');
    this.uApi.callGetExecute('17', this.formCode || '').subscribe((res) => {
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
      customer03Ctrl: [this.arrayData.asent_camp, [Validators.maxLength(100)]],
      customer04Ctrl: [this.arrayData.asent_origi, [Validators.maxLength(100)]],
      customer05Ctrl: [
        this.arrayData.dimension_total_propidad,
        [Validators.maxLength(100)],
      ],
      customer06Ctrl: [
        this.arrayData.dimension_ocupada,
        [Validators.maxLength(100)],
      ],
      customer07Ctrl: [this.arrayData.tipo_ganado, [Validators.maxLength(100)]],
      customer08Ctrl: [
        this.arrayData.cantidad_cabezas_ganado,
        [Validators.maxLength(100)],
      ],
      customer09Ctrl: [
        this.arrayData.cantidad_potreros,
        [Validators.maxLength(100)],
      ],
      customer10Ctrl: [
        this.arrayData.finalidad_produccion,
        [Validators.maxLength(100)],
      ],
      customer11Ctrl: [
        this.arrayData.superficie_propia,
        [Validators.maxLength(100)],
      ],
      customer12Ctrl: [
        this.arrayData.superficie_arrendada,
        [Validators.maxLength(100)],
      ],
      customer13Ctrl: [
        this.arrayData.area_total_cultivada,
        [Validators.maxLength(100)],
      ],

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

      infra01Ctrl: [this.arrayData.infra_01, [Validators.maxLength(100)]],
      infra01expCtrl: [
        this.arrayData.infra_exp_01,
        [Validators.maxLength(100)],
      ],

      infra02Ctrl: [this.arrayData.infra_02, [Validators.maxLength(100)]],
      infra02expCtrl: [
        this.arrayData.infra_exp_02,
        [Validators.maxLength(100)],
      ],

      infra03Ctrl: [this.arrayData.infra_03, [Validators.maxLength(100)]],
      infra03expCtrl: [
        this.arrayData.infra_exp_03,
        [Validators.maxLength(100)],
      ],

      infra04Ctrl: [this.arrayData.infra_04, [Validators.maxLength(100)]],
      infra04expCtrl: [
        this.arrayData.infra_exp_04,
        [Validators.maxLength(100)],
      ],

      infra05Ctrl: [this.arrayData.infra_05, [Validators.maxLength(100)]],
      infra05expCtrl: [
        this.arrayData.infra_exp_05,
        [Validators.maxLength(100)],
      ],

      infra06Ctrl: [this.arrayData.infra_06, [Validators.maxLength(100)]],

      infra07Ctrl: [this.arrayData.infra_07, [Validators.maxLength(100)]],

      infra08Ctrl: [this.arrayData.infra_08, [Validators.maxLength(100)]],

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

      suelo04Ctrl: [this.arrayData.suelo_04, [Validators.maxLength(100)]],
      suelo04expCtrl: [
        this.arrayData.suelo_exp_04,
        [Validators.maxLength(100)],
      ],

      suelo05Ctrl: [this.arrayData.suelo_05, [Validators.maxLength(100)]],
      suelo05expCtrl: [
        this.arrayData.suelo_exp_05,
        [Validators.maxLength(100)],
      ],

      suelo06Ctrl: [this.arrayData.suelo_06, [Validators.maxLength(100)]],
      suelo06expCtrl: [
        this.arrayData.suelo_exp_06,
        [Validators.maxLength(100)],
      ],

      agua01Ctrl: [this.arrayData.agua_01, [Validators.maxLength(100)]],
      agua01expCtrl: [this.arrayData.agua_exp_01, [Validators.maxLength(100)]],

      agua02Ctrl: [this.arrayData.agua_02, [Validators.maxLength(100)]],
      agua02expCtrl: [this.arrayData.agua_exp_02, [Validators.maxLength(100)]],

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

      ssc01Ctrl: [this.arrayData.ssc_01, [Validators.maxLength(100)]],
      ssc01expCtrl: [this.arrayData.ssc_exp_01, [Validators.maxLength(100)]],

      ssc02Ctrl: [this.arrayData.ssc_02, [Validators.maxLength(100)]],
      ssc02expCtrl: [this.arrayData.ssc_exp_02, [Validators.maxLength(100)]],

      ssc03Ctrl: [this.arrayData.ssc_03, [Validators.maxLength(100)]],
      ssc03expCtrl: [this.arrayData.ssc_exp_03, [Validators.maxLength(100)]],

      ppgc01Ctrl: [this.arrayData.ppgc_01, [Validators.maxLength(100)]],
      ppgc01expCtrl: [this.arrayData.ppgc_exp_01, [Validators.maxLength(100)]],

      ppgc02Ctrl: [this.arrayData.ppgc_02, [Validators.maxLength(100)]],
      ppgc02expCtrl: [this.arrayData.ppgc_exp_02, [Validators.maxLength(100)]],

      ppgc03Ctrl: [this.arrayData.ppgc_03, [Validators.maxLength(100)]],
      ppgc03expCtrl: [this.arrayData.ppgc_exp_03, [Validators.maxLength(100)]],

      ppgc04Ctrl: [this.arrayData.ppgc_04, [Validators.maxLength(100)]],
      ppgc04expCtrl: [this.arrayData.ppgc_exp_04, [Validators.maxLength(100)]],

      ppgc05Ctrl: [this.arrayData.ppgc_05, [Validators.maxLength(100)]],
      ppgc05expCtrl: [this.arrayData.ppgc_exp_05, [Validators.maxLength(100)]],

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
      this.isEdit = true;
      this.isCerrar = true;
      this.isCancel = false;
      this.isSave = false;
      this.editMode = false;

      Object.keys(this.formularioFormGroup.controls).forEach((key) => {
        this.formularioFormGroup.controls[key].disable();
      });
    } else if (option == '2') {
      this.isEdit = false;
      this.isCerrar = false;
      this.isCancel = true;
      this.isSave = true;
      this.editMode = true;

      Object.keys(this.formularioFormGroup.controls).forEach((key) => {
        this.formularioFormGroup.controls[key].enable();
      });
    }
  }

  closeForm() {
    this.router.navigate(['/home/ListOfficer']);
  }

  postFormData() {
    let datos = '';
    Object.keys(this.formularioFormGroup.controls).forEach((key) => {
      datos = datos + this.formularioFormGroup.controls[key].value + ',';
    });
    let dataArray = {
      opcion: '10',
      SQLStr:
        localStorage.getItem('uniqueKeyValue') +
        ',' +
        datos +
        ',' +
        localStorage.getItem('username'),
    };
    this.uApi.callPostExecute(dataArray).subscribe((res) => {
      this._snackBar.open('Datos del formulario actualizados!', 'Cerrar', {
        duration: 3 * 1000,
      });
      this.router.navigate(['/home/ListOfficer']);
    });
  }

  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57)) {
      return false;
    }
    return true;
  }

  commentsOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode == 44) {
      return false;
    }
    return true;
  }

  getRegistStatus() {
    this.uApi.callGetExecute('16', this.formCode || '').subscribe((res) => {
      let status = res[0];
      if (status.state == 'INICIADO' || status.state == 'CORRECCIÓN') {
        this.isDesicion = true;
      } else {
        this.isDesicion = false;
      }
    });
  }
}
