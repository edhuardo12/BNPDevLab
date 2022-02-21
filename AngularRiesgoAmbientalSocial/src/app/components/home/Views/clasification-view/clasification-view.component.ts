import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clasification } from 'src/app/components/Class/clasification';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-clasification-view',
  templateUrl: './clasification-view.component.html',
  styleUrls: ['./clasification-view.component.css'],
  providers: [Clasification, DecimalPipe],
})
export class ClasificationViewComponent implements OnInit {
  showResultadoFormGroup!: FormGroup;
  arrayData!: any;
  displayFormGroup!: FormGroup;
  formCode!: any;
  sectors!: any;
  subsectors!: any;
  sectorView = true;
  selectorEdit = false;
  otherActivities = false;
  resultado_formula_riesgo!: any;
  resultado_nivel_riesgo!: any;
  calculoManual = false;
  isEdit = true;
  isSave = false;
  isCerrar = true;
  isCancel = false;
  statusReg = true;
  nivelView = true;
  bgColor!: any;
  highRiskListChecked = false;
  riesgoVentasAnuales!: any;
  riesgoExpoGrupo!: any;
  manualRiskSelected!: any;
  nivelRiesgoDB!: any;

  constructor(
    public uApi: ApiService,
    public _formBuilder: FormBuilder,
    public router: Router,
    private _decimalPipe: DecimalPipe,
    private _snackBar: MatSnackBar,
    private _clasificacion: Clasification
  ) {}

  ngOnInit(): void {
    let form_clave = localStorage.getItem('form_code');
    this.formCode = form_clave;
    this.riesgoExpoGrupo = 0;
    this.manualRiskSelected = null;
    this.uApi.getClasificationFormData(form_clave || '').subscribe((res) => {
      this.arrayData = res[0];
      this.resultado_formula_riesgo = this.arrayData.resultados_riesgo_social;
      this.iniFormGroup();
      this.getAllSectors();
      this.getRegistStatus();
    });
  }

  iniFormGroup() {
    this.displayFormGroup = this._formBuilder.group({
      customerNumberCtr: [this.arrayData.numero_cliente],
      customerNameCtr: [this.arrayData.nombre_cliente],
      customerCityCtr: [this.arrayData.ciudad],
      customerDepCtr: [this.arrayData.banca],
      customerZoneCtr: [this.arrayData.zona],
      customerBranchCtr: [this.arrayData.sucursal],
      customerOfficerCtr: [this.arrayData.oficial],
      customerSectorCtr: [this.arrayData.sector],
      customerSubSectorCtr: [this.arrayData.subsector],
      customerManualActivityCtr: [this.arrayData.actividad_cliente],
      customerManualRiskCtr: [this.arrayData.riesgo_manual],
      checkBox1Ctr: [this.arrayData.checklist_campo_1],
      checkBox2Ctr: [this.arrayData.checklist_campo_2],
      checkBox3Ctr: [this.arrayData.checklist_campo_3],
      checkBox4Ctr: [this.arrayData.checklist_campo_4],
      checkBox5Ctr: [this.arrayData.checklist_campo_5],
      checkBox6Ctr: [this.arrayData.checklist_campo_6],
      checkBox7Ctr: [this.arrayData.checklist_campo_7],
      checkBox8Ctr: [this.arrayData.checklist_campo_8],
      checkBox9Ctr: [this.arrayData.checklist_campo_9],
      annualSalesCtr: [this.arrayData.ventas_anuales, [Validators.required]],
      creditAmountCtr: [this.arrayData.monto_credito, [Validators.required]],
      groupExposseCtr: [this.arrayData.exposicion_grupo, [Validators.required]],
      sectorsGroupCtrl: [null, [Validators.required]],
      subsectorsGroupCtrl: [null, Validators.required],
      manualCustomerActivityCtrl: [null],
      resutlRiesgoSocial: [this.arrayData.resultados_riesgo_social],
      resultNivelRiesgoSocial: [this.arrayData.resultado_nivel_riesgo_social],
      nivelResultado: [null],
      ratingResultado: [null],
    });
    this.turnEdition('1');
  }

  getAllSectors() {
    this.uApi.getAllSectors('').subscribe((res) => {
      this.sectors = res;
    });
  }

  getSubSectors(event: any) {
    this._clasificacion.sector = event.value;
    this.uApi
      .callGetExecute('24', this._clasificacion.sector)
      .subscribe((res) => {
        this.nivelRiesgoDB = res[0].nivel_riesgo;
        if (this._clasificacion.sector == '999') {
          this.calculoManual = true;
          this.displayFormGroup.controls['nivelResultado'].setValue('BAJO');
          this.displayFormGroup.controls['ratingResultado'].setValue('NIVEL 1');
          this.resultado_formula_riesgo = 'BAJO';
          this.resultado_nivel_riesgo = 'NIVEL 1';
          this.displayFormGroup.controls['subsectorsGroupCtrl'].setValue('');
          this.displayFormGroup.controls['subsectorsGroupCtrl'].disable();
          this.manualRiskSelected = 'Bajo';
          this.displayFormGroup.controls[
            'manualCustomerActivityCtrl'
          ].setValidators([Validators.required]);
          this.displayFormGroup.controls[
            'manualCustomerActivityCtrl'
          ].updateValueAndValidity();
          this.otherActivities = true;
        } else {
          this.calculoManual = false;
          this.otherActivities = false;
          this.displayFormGroup.controls['subsectorsGroupCtrl'].enable();
          this.displayFormGroup.controls[
            'manualCustomerActivityCtrl'
          ].clearValidators();
          this.displayFormGroup.controls[
            'manualCustomerActivityCtrl'
          ].updateValueAndValidity();
          this.displayFormGroup.controls['customerManualActivityCtr'].setValue(
            'No aplica'
          );
          this.displayFormGroup.controls['customerManualRiskCtr'].setValue(
            'No aplica'
          );

          this.displayFormGroup.controls['manualCustomerActivityCtrl'].setValue(
            'No Aplica'
          );

          this.manualRiskSelected = 'No Aplica';

          this.callSubSectors(this._clasificacion.sector);
        }
        this.calculateRisk();
      });
  }

  callSubSectors(data: any) {
    this.uApi.getSubSector(data).subscribe((res) => {
      this.subsectors = res;
    });
  }

  getSubSector(event: any) {
    this._clasificacion.subsector = event.value;
  }

  getManualRiskSelected(opcion: number) {
    if (opcion == 1) {
      this.manualRiskSelected = 'BAJO';
      this.resultado_formula_riesgo = 'BAJO';
      this.resultado_nivel_riesgo = 'NIVEL 1';
      this.displayFormGroup.controls['nivelResultado'].setValue('BAJO');
      this.displayFormGroup.controls['ratingResultado'].setValue('NIVEL 1');
    } else if (opcion == 2) {
      this.manualRiskSelected = 'MEDIO';
      this.resultado_formula_riesgo = 'MEDIO';
      this.resultado_nivel_riesgo = 'NIVEL 2';
      this.displayFormGroup.controls['nivelResultado'].setValue('MEDIO');
      this.displayFormGroup.controls['ratingResultado'].setValue('NIVEL 2');
    } else if (opcion == 3) {
      this.manualRiskSelected = 'ALTO';
      this.resultado_formula_riesgo = 'ALTO';
      this.resultado_nivel_riesgo = 'NIVEL 3';
      this.displayFormGroup.controls['nivelResultado'].setValue('ALTO');
      this.displayFormGroup.controls['ratingResultado'].setValue('NIVEL 3');
    }
    this.calculateRisk();
  }

  turnEdition(option: any) {
    if (option == '1') {
      this.sectorView = true;
      this.nivelView = true;
      this.selectorEdit = false;
      this.isEdit = true;
      this.isCerrar = true;
      this.isCancel = false;
      this.isSave = false;
      this.displayFormGroup.controls['customerNameCtr'].disable();
      this.displayFormGroup.controls['customerNumberCtr'].disable();
      this.displayFormGroup.controls['customerCityCtr'].disable();
      this.displayFormGroup.controls['customerDepCtr'].disable();
      this.displayFormGroup.controls['customerZoneCtr'].disable();
      this.displayFormGroup.controls['customerBranchCtr'].disable();
      this.displayFormGroup.controls['customerOfficerCtr'].disable();
      this.displayFormGroup.controls['customerSectorCtr'].disable();
      this.displayFormGroup.controls['customerSubSectorCtr'].disable();
      this.displayFormGroup.controls['customerManualActivityCtr'].disable();
      this.displayFormGroup.controls['customerManualRiskCtr'].disable();
      this.displayFormGroup.controls['checkBox1Ctr'].disable();
      this.displayFormGroup.controls['checkBox2Ctr'].disable();
      this.displayFormGroup.controls['checkBox3Ctr'].disable();
      this.displayFormGroup.controls['checkBox4Ctr'].disable();
      this.displayFormGroup.controls['checkBox5Ctr'].disable();
      this.displayFormGroup.controls['checkBox6Ctr'].disable();
      this.displayFormGroup.controls['checkBox7Ctr'].disable();
      this.displayFormGroup.controls['checkBox8Ctr'].disable();
      this.displayFormGroup.controls['checkBox9Ctr'].disable();
      this.displayFormGroup.controls['annualSalesCtr'].disable();
      this.displayFormGroup.controls['creditAmountCtr'].disable();
      this.displayFormGroup.controls['groupExposseCtr'].disable();
      this.displayFormGroup.controls['nivelResultado'].disable();
      this.displayFormGroup.controls['ratingResultado'].disable();
      this.displayFormGroup.controls['resutlRiesgoSocial'].disable();
      this.displayFormGroup.controls['resultNivelRiesgoSocial'].disable();
    } else if (option == '2') {
      this.sectorView = false;
      this.nivelView = false;
      this.selectorEdit = true;
      this.isEdit = false;
      this.isCerrar = false;
      this.isCancel = true;
      this.isSave = true;
      this.displayFormGroup.controls['customerSectorCtr'].enable();
      this.displayFormGroup.controls['customerSubSectorCtr'].enable();
      this.displayFormGroup.controls['checkBox1Ctr'].enable();
      this.displayFormGroup.controls['checkBox2Ctr'].enable();
      this.displayFormGroup.controls['checkBox3Ctr'].enable();
      this.displayFormGroup.controls['checkBox4Ctr'].enable();
      this.displayFormGroup.controls['checkBox5Ctr'].enable();
      this.displayFormGroup.controls['checkBox6Ctr'].enable();
      this.displayFormGroup.controls['checkBox7Ctr'].enable();
      this.displayFormGroup.controls['checkBox8Ctr'].enable();
      this.displayFormGroup.controls['checkBox9Ctr'].enable();
      this.displayFormGroup.controls['annualSalesCtr'].enable();
      this.displayFormGroup.controls['creditAmountCtr'].enable();
      this.displayFormGroup.controls['groupExposseCtr'].enable();
      this.displayFormGroup.controls['resutlRiesgoSocial'].disable();
      this.displayFormGroup.controls['resultNivelRiesgoSocial'].disable();
      this.displayFormGroup.controls['nivelResultado'].disable();
      this.displayFormGroup.controls['ratingResultado'].disable();
    }
  }

  checkListItemSelected(opcion: number, event: any) {
    if (event.checked == true) {
      this.highRiskListChecked = true;
    } else if (event.checked == false) {
      this.highRiskListChecked = false;
    }

    this.calculateRisk();
  }

  calculateRisk() {
    if (this.calculoManual == false) {
      if (this.highRiskListChecked == true) {
        this.resultado_formula_riesgo = 'ALTO';
      } else {
        if (
          this._clasificacion.sector == 'A' ||
          this._clasificacion.sector == 'F' ||
          this._clasificacion.sector == 'B'
        ) {
          let totalExpoCustomer: number = Number(
            this.displayFormGroup.controls['creditAmountCtr'].value
          );
          if (
            this._clasificacion.sector == 'A' ||
            this._clasificacion.sector == 'B'
          ) {
            if (totalExpoCustomer >= 2000001.0) {
              this.resultado_formula_riesgo = 'ALTO';
            } else {
              this.resultado_formula_riesgo = this.nivelRiesgoDB;
            }
          } else if (this._clasificacion.sector == 'F') {
            if (totalExpoCustomer >= 10000001.0) {
              this.resultado_formula_riesgo = 'ALTO';
            } else {
              this.resultado_formula_riesgo = this.nivelRiesgoDB;
            }
          }
        } else {
          this.resultado_formula_riesgo = this.nivelRiesgoDB;
        }
      }

      if (this.resultado_formula_riesgo == 'BAJO') {
        this.resultado_nivel_riesgo = 'NIVEL 1';
      } else if (this.resultado_formula_riesgo == 'MEDIO') {
        this.resultado_nivel_riesgo = 'NIVEL 2';
      } else if (this.resultado_formula_riesgo == 'ALTO') {
        this.resultado_nivel_riesgo = 'NIVEL 3';
      }
      this.showFormulaResult();
    } else if (this.calculoManual == true) {
      if (this.highRiskListChecked == true) {
        this.resultado_formula_riesgo = 'ALTO';
        this.resultado_nivel_riesgo = 'NIVEL 3';
        this.displayFormGroup.controls['nivelResultado'].setValue('ALTO');
        this.displayFormGroup.controls['ratingResultado'].setValue('NIVEL 3');
      }
    }
  }

  showFormulaResult() {
    this.displayFormGroup.controls['nivelResultado'].setValue(
      this.resultado_formula_riesgo
    );
    this.displayFormGroup.controls['ratingResultado'].setValue(
      this.resultado_nivel_riesgo
    );
    // if ((this.resultado_formula_riesgo = 'BAJO')) {
    //   this.bgColor = '9bf85dc4'; // 9bf85dc4, e7fc2c, f80c0c
    // } else if ((this.resultado_formula_riesgo = 'MEDIO')) {
    //   this.bgColor = 'e7fc2c'; // 9bf85dc4, e7fc2c, f80c0c
    // } else if ((this.resultado_formula_riesgo = 'ALTO')) {
    //   this.bgColor = 'f80c0c'; // 9bf85dc4, e7fc2c, f80c0c
    // }
  }

  postUpdateData() {
    let dataArray = {
      opcion: 3,
      SQLStr:
        localStorage.getItem('uniqueKeyValue') +
        ',' +
        this.displayFormGroup.controls['sectorsGroupCtrl'].value +
        ',' +
        this.displayFormGroup.controls['subsectorsGroupCtrl'].value +
        ',' +
        this.displayFormGroup.controls['manualCustomerActivityCtrl'].value +
        ',' +
        this.manualRiskSelected +
        ',' +
        this.displayFormGroup.controls['checkBox1Ctr'].value +
        ',' +
        this.displayFormGroup.controls['checkBox2Ctr'].value +
        ',' +
        this.displayFormGroup.controls['checkBox3Ctr'].value +
        ',' +
        this.displayFormGroup.controls['checkBox4Ctr'].value +
        ',' +
        this.displayFormGroup.controls['checkBox5Ctr'].value +
        ',' +
        this.displayFormGroup.controls['checkBox6Ctr'].value +
        ',' +
        this.displayFormGroup.controls['checkBox7Ctr'].value +
        ',' +
        this.displayFormGroup.controls['checkBox8Ctr'].value +
        ',' +
        this.displayFormGroup.controls['checkBox9Ctr'].value +
        ',' +
        this.displayFormGroup.controls['annualSalesCtr'].value +
        ',' +
        this.displayFormGroup.controls['creditAmountCtr'].value +
        ',' +
        this.displayFormGroup.controls['groupExposseCtr'].value +
        ',' +
        this.resultado_formula_riesgo +
        ',' +
        this.resultado_nivel_riesgo +
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

  closeForm() {
    this.router.navigate(['/home/ListOfficer']);
  }

  getRegistStatus() {
    this.uApi.callGetExecute('16', this.formCode || '').subscribe((res) => {
      let status = res[0];
      if (status.state == 'INICIADO' || status.state == 'CORRECCIÓN') {
        this.statusReg = true;
      } else {
        this.statusReg = false;
      }
    });
    this.iniFormGroup();
  }
}
