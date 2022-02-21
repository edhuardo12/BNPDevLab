import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-print-seguimiento',
  templateUrl: './print-seguimiento.component.html',
  styleUrls: ['./print-seguimiento.component.css'],
})
export class PrintSeguimientoComponent implements OnInit {
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
    this.uApi.callGetExecute('23', this.formCode || '').subscribe((res) => {
      this.arrayData = res[0];
      this.getIniFormGroup();
    });
  }

  getIniFormGroup() {
    this.formularioFormGroup = this._formBuilder.group({
      segData01: [this.arrayData.niver_riesgo_AS],
      segData02: [this.totalExpoConvert()],
      segData03: [this.arrayData.rating_AS],
      segData04: [this.arrayData.sector],
      segData05: [this.arrayData.subsector],
      segData06: [this.arrayData.actividad_cliente_manual],
      segData07: [this.arrayData.niver_riesgo_manual_AS],
      segData08: [this.checkValueConvert(this.arrayData.checklist_campo_1)],
      segData09: [this.checkValueConvert(this.arrayData.checklist_campo_2)],
      segData10: [this.checkValueConvert(this.arrayData.checklist_campo_3)],
      segData11: [this.checkValueConvert(this.arrayData.checklist_campo_4)],
      segData12: [this.checkValueConvert(this.arrayData.checklist_campo_5)],
      segData13: [this.checkValueConvert(this.arrayData.checklist_campo_6)],
      segData14: [this.checkValueConvert(this.arrayData.checklist_campo_7)],
      segData15: [this.checkValueConvert(this.arrayData.checklist_campo_8)],
      segData16: [this.checkValueConvert(this.arrayData.checklist_campo_9)],
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
      segData29: [null],
      nombreClienteCtrl: [this.arrayData.nombre_cliente],
      numeroClienteCtrl: [this.arrayData.numero_cliente]
    });
    Object.keys(this.formularioFormGroup.controls).forEach((key) => {
      this.formularioFormGroup.controls[key].disable();
    });
    this.getAporbador();
  }

  totalExpoConvert() {
    let data = this.arrayData.tota_expo_grupo;
    if (data == 'Menor o igual') {
      return '<= 500,000';
    } else if (data == 'Mayor') {
      return '> 500,000';
    } else {
      return 'No definido';
    }
  }

  checkValueConvert(data: any) {
    if (data == false) {
      return 'NO';
    } else if (data == true) {
      return 'SI';
    } else {
      return 'No definido';
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
      this.formularioFormGroup.controls['segData29'].setValue(this.userMod);
    });
  }

  returnMainPage() {
    this.router.navigate(['/home']);
  }
}
