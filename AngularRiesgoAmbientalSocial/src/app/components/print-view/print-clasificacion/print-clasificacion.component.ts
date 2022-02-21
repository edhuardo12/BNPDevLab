import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PrintForm } from '../../Class/print-form';

@Component({
  selector: 'app-print-clasificacion',
  templateUrl: './print-clasificacion.component.html',
  styleUrls: ['./print-clasificacion.component.css'],
  providers: [PrintForm],
})
export class PrintClasificacionComponent implements OnInit {
  formularioFormGroup!: FormGroup;
  formCode!: any;
  arrayData!: any;
  formData!: PrintForm;
  userMod!: any;
  constructor(
    public uApi: ApiService,
    public _formBuilder: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.formCode = localStorage.getItem('form_code');
    this.uApi.getClasificationFormData(this.formCode || '').subscribe((res) => {
      this.arrayData = res[0];
      this.getAporbador();
      this.cargarCampos();
    });
  }

  cargarCampos() {
    this.formularioFormGroup = this._formBuilder.group({
      formularioDatae01: [
        this.validateDataFromDB(this.arrayData.nombre_cliente),
      ],
      formularioDatae02: [
        this.validateDataFromDB(this.arrayData.numero_cliente),
      ],
      formularioDatae03: [this.validateDataFromDB(this.arrayData.ciudad)],
      formularioDatae04: [this.validateDataFromDB(this.arrayData.banca)],
      formularioDatae05: [this.validateDataFromDB(this.arrayData.zona)],
      formularioDatae06: [this.validateDataFromDB(this.arrayData.sucursal)],
      formularioDatae07: [this.validateDataFromDB(this.arrayData.oficial)],
      formularioDatae08: [this.validateDataFromDB(this.arrayData.sector)],
      formularioDatae09: [this.validateDataFromDB(this.arrayData.subsector)],
      formularioDatae10: [
        this.validateDataFromDB(this.arrayData.actividad_cliente),
      ],
      formularioDatae11: [
        this.validateDataFromDB(this.arrayData.riesgo_manual),
      ],
      formularioDatae12: [
        this.validateDataFromDB(this.arrayData.checklist_campo_1),
      ],
      formularioDatae13: [
        this.validateDataFromDB(this.arrayData.checklist_campo_2),
      ],
      formularioDatae14: [
        this.validateDataFromDB(this.arrayData.checklist_campo_3),
      ],
      formularioDatae15: [
        this.validateDataFromDB(this.arrayData.checklist_campo_4),
      ],
      formularioDatae16: [
        this.validateDataFromDB(this.arrayData.checklist_campo_5),
      ],
      formularioDatae17: [
        this.validateDataFromDB(this.arrayData.checklist_campo_6),
      ],
      formularioDatae18: [
        this.validateDataFromDB(this.arrayData.checklist_campo_7),
      ],
      formularioDatae19: [
        this.validateDataFromDB(this.arrayData.checklist_campo_8),
      ],
      formularioDatae20: [
        this.validateDataFromDB(this.arrayData.checklist_campo_9),
      ],
      formularioDatae21: [
        this.validateDataFromDB(this.arrayData.ventas_anuales),
      ],
      formularioDatae22: [
        this.validateDataFromDB(this.arrayData.monto_credito),
      ],
      formularioDatae23: [
        this.validateDataFromDB(this.arrayData.exposicion_grupo),
      ],
      formularioDatae24: [
        this.validateDataFromDB(this.arrayData.resultados_riesgo_social),
      ],
      formularioDatae25: [
        this.validateDataFromDB(this.arrayData.resultado_nivel_riesgo_social),
      ],
      formularioDatae26: [this.userMod],
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
      this.cargarCampos();
    });
  }

  returnMainPage() {
    this.router.navigate(['/home']);
  }
}
