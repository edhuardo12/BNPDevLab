import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-print-agricola',
  templateUrl: './print-agricola.component.html',
  styleUrls: ['./print-agricola.component.css'],
})
export class PrintAgricolaComponent implements OnInit {
  formularioFormGroup!: FormGroup;
  formCode!: any;
  arrayData!: any;
  userMod!: any;
  constructor(
    public uApi: ApiService,
    public _formBuilder: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.formCode = localStorage.getItem('form_code');
    this.uApi.callGetExecute('15', this.formCode || '').subscribe((res) => {
      this.arrayData = res[0];
      this.getAporbador();
      this.getIniFormGroup();
    });
  }

  getIniFormGroup() {
    this.formularioFormGroup = this._formBuilder.group({
      numeroClienteCtrl: [this.arrayData.numero_cliente],
      zonaHabitacional: [this.arrayData.zona_habitacional],
      areaProtegida: [this.arrayData.area_protegida],
      asentCamp: [this.arrayData.asent_camp],
      asentOrig: [this.arrayData.asent_origi],
      dimesionTotal: [this.arrayData.dimencion_total_propiedad],
      dimesionOcupada: [this.arrayData.dimencion_total_propiedad],
      cutlivos: [this.arrayData.cutlivos],
      superficiePropia: [this.arrayData.superficie_propia],
      superficieArrendada: [this.arrayData.superficie_arrendada],
      areaTotal: [this.arrayData.area_total],
      legisPerm01Ctrl: [this.arrayData.legis_perm_01],
      legisPerm01expCtrl: [this.arrayData.legis_perm_exp_01],
      legisPerm02Ctrl: [this.arrayData.legis_perm_02],
      legisPerm02expCtrl: [this.arrayData.legis_perm_exp_02],

      infra01Ctrl: [this.arrayData.infra_01],
      infra01expCtrl: [this.arrayData.infra_exp_01],

      infra02Ctrl: [this.arrayData.infra_02],
      infra02expCtrl: [this.arrayData.infra_exp_02],

      infra03Ctrl: [this.arrayData.infra_03],
      infra03expCtrl: [this.arrayData.infra_exp_03],

      infra04Ctrl: [this.arrayData.infra_04],
      infra04expCtrl: [this.arrayData.infra_exp_04],

      infra05Ctrl: [this.arrayData.infra_05],
      infra05expCtrl: [this.arrayData.infra_exp_05],

      infra06Ctrl: [this.arrayData.infra_06],

      suelo01Ctrl: [this.arrayData.suelo_01],
      suelo01expCtrl: [this.arrayData.suelo_exp_01],

      suelo02Ctrl: [this.arrayData.suelo_02],
      suelo02expCtrl: [this.arrayData.suelo_exp_02],

      suelo03Ctrl: [this.arrayData.suelo_03],
      suelo03expCtrl: [this.arrayData.suelo_exp_03],

      agua01Ctrl: [this.arrayData.agua_01],
      agua01expCtrl: [this.arrayData.agua_exp_01],

      agua02Ctrl: [this.arrayData.agua_02],
      agua02expCtrl: [this.arrayData.agua_exp_02],

      agua03Ctrl: [this.arrayData.agua_03],
      agua04Ctrl: [this.arrayData.agua_04],
      agua05Ctrl: [this.arrayData.agua_05],
      agua06Ctrl: [this.arrayData.agua_06],

      ssc01Ctrl: [this.arrayData.ssc_01],
      ssc01expCtrl: [this.arrayData.ssc_exp_01],

      ssc02Ctrl: [this.arrayData.ssc_02],
      ssc02expCtrl: [this.arrayData.ssc_exp_02],

      ssc03Ctrl: [this.arrayData.ssc_03],
      ssc03expCtrl: [this.arrayData.ssc_exp_03],

      ppgc01Ctrl: [this.arrayData.ppgc_01],
      ppgc01expCtrl: [this.arrayData.ppgc_exp_01],

      ppgc02Ctrl: [this.arrayData.ppgc_02],
      ppgc02expCtrl: [this.arrayData.ppgc_exp_02],

      ppgc03Ctrl: [this.arrayData.ppgc_03],
      ppgc03expCtrl: [this.arrayData.ppgc_exp_03],

      ppgc04Ctrl: [this.arrayData.ppgc_04],
      ppgc04expCtrl: [this.arrayData.ppgc_exp_04],

      ppgc05Ctrl: [this.arrayData.ppgc_05],
      ppgc05expCtrl: [this.arrayData.ppgc_exp_05],

      ppgc06Ctrl: [this.arrayData.ppgc_06],
      ppgc06expCtrl: [this.arrayData.ppgc_exp_06],

      ppgc07Ctrl: [this.arrayData.ppgc_07],
      ppgc07expCtrl: [this.arrayData.ppgc_exp_07],

      ppgc08Ctrl: [this.arrayData.ppgc_08],
      ppgc08expCtrl: [this.arrayData.ppgc_exp_08],

      ppgc09Ctrl: [this.arrayData.ppgc_09],
      ppgc09expCtrl: [this.arrayData.ppgc_exp_09],

      ppgc10Ctrl: [this.arrayData.ppgc_10],
      ppgc10expCtrl: [this.arrayData.ppgc_exp_10],

      ppgc11Ctrl: [this.arrayData.ppgc_11],
      ppgc11expCtrl: [this.arrayData.ppgc_exp_11],

      conclusion: [this.arrayData.conclusiones],
      recomendacion: [this.arrayData.recomendaciones],
      usuarioAprobadorCtrl: [this.userMod],
      
    });
    Object.keys(this.formularioFormGroup.controls).forEach((key) => {
      this.formularioFormGroup.controls[key].disable();
    });
  }

  validateDataFromDB(data: any) {
    if (data == null || data == undefined) {
      return '';
    } else if (data == true) {
      return 'Si';
    } else if (data == false) {
      return 'No';
    } else {
      return data;
    }
  }

  printDocument() {
    window.print();
  }

  getAporbador() {
    let uniqueKey = localStorage.getItem('uniqueKeyValue');
    this.uApi.callGetExecute('21', uniqueKey || '').subscribe((res) => {
      let user_mod = res;
      this.userMod = user_mod[0].modification_user;
      this.getIniFormGroup();
    });
  }

  returnMainPage() {
    this.router.navigate(['/home']);
  }
}
