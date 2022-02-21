import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-agro-view',
  templateUrl: './agro-view.component.html',
  styleUrls: ['./agro-view.component.css'],
})
export class AgroViewComponent implements OnInit {
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
    this.uApi.callGetExecute('15', this.formCode || '').subscribe((res) => {
      this.arrayData = res[0];
      this.getIniFormGroup();
      this.getRegistStatus();
    });
  }

  getIniFormGroup() {
    this.formularioFormGroup = this._formBuilder.group({
      zonaHabitacional: [
        this.arrayData.zona_habitacional,
        [Validators.maxLength(100)],
      ],
      areaProtegida: [
        this.arrayData.area_protegida,
        [Validators.maxLength(100)],
      ],
      asentCamp: [this.arrayData.asent_camp, [Validators.maxLength(100)]],
      asentOrig: [this.arrayData.asent_origi, [Validators.maxLength(100)]],
      dimesionTotal: [
        this.arrayData.dimencion_total_propiedad,
        [Validators.pattern('^[0-9]{4}.[0-9]{2}.[0-9]{2}$')],
      ],
      dimesionOcupada: [
        this.arrayData.dimencion_total_propiedad,
        [Validators.pattern('^[0-9]{4}.[0-9]{2}.[0-9]{2}$')],
      ],
      cutlivos: [this.arrayData.cutlivos, [Validators.maxLength(100)]],
      superficiePropia: [
        this.arrayData.superficie_propia,
        [Validators.pattern('^(0|[1-9][0-9]*|[1-9][0-9]{0,2}(,[0-9]{3,3})*)$')],
      ],
      superficieArrendada: [
        this.arrayData.superficie_arrendada,
        [Validators.pattern('^(0|[1-9][0-9]*|[1-9][0-9]{0,2}(,[0-9]{3,3})*)$')],
      ],
      areaTotal: [
        this.arrayData.area_total,
        [Validators.pattern('^(0|[1-9][0-9]*|[1-9][0-9]{0,2}(,[0-9]{3,3})*)$')],
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

      agua01Ctrl: [this.arrayData.agua_01, [Validators.maxLength(100)]],
      agua01expCtrl: [this.arrayData.agua_exp_01, [Validators.maxLength(100)]],

      agua02Ctrl: [this.arrayData.agua_02, [Validators.maxLength(100)]],
      agua02expCtrl: [this.arrayData.agua_exp_02, [Validators.maxLength(100)]],

      agua03Ctrl: [
        this.arrayData.agua_03,
        [Validators.pattern('^(0|[1-9][0-9]*|[1-9][0-9]{0,2}(,[0-9]{3,3})*)$')],
      ],
      agua04Ctrl: [this.arrayData.agua_04, [Validators.maxLength(100)]],
      agua05Ctrl: [this.arrayData.agua_05, [Validators.maxLength(100)]],
      agua06Ctrl: [
        this.arrayData.agua_06,
        [Validators.pattern('^(0|[1-9][0-9]*|[1-9][0-9]{0,2}(,[0-9]{3,3})*)$')],
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

      ppgc06Ctrl: [this.arrayData.ppgc_06, [Validators.maxLength(100)]],
      ppgc06expCtrl: [this.arrayData.ppgc_exp_06, [Validators.maxLength(100)]],

      ppgc07Ctrl: [this.arrayData.ppgc_07, [Validators.maxLength(100)]],
      ppgc07expCtrl: [this.arrayData.ppgc_exp_07, [Validators.maxLength(100)]],

      ppgc08Ctrl: [this.arrayData.ppgc_08, [Validators.maxLength(100)]],
      ppgc08expCtrl: [this.arrayData.ppgc_exp_08, [Validators.maxLength(100)]],

      ppgc09Ctrl: [this.arrayData.ppgc_09, [Validators.maxLength(100)]],
      ppgc09expCtrl: [this.arrayData.ppgc_exp_09, [Validators.maxLength(100)]],

      ppgc10Ctrl: [this.arrayData.ppgc_10, [Validators.maxLength(100)]],
      ppgc10expCtrl: [this.arrayData.ppgc_exp_10, [Validators.maxLength(100)]],

      ppgc11Ctrl: [this.arrayData.ppgc_11, [Validators.maxLength(100)]],
      ppgc11expCtrl: [this.arrayData.ppgc_exp_11, [Validators.maxLength(100)]],

      conclusion: [this.arrayData.conclusiones, [Validators.maxLength(256)]],
      recomendacion: [
        this.arrayData.recomendaciones,
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

  postFormData() {
    let datos = '';
    Object.keys(this.formularioFormGroup.controls).forEach((key) => {
      datos = datos + this.formularioFormGroup.controls[key].value + ',';
    });
    let dataArray = {
      opcion: '9',
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
