import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clasification } from 'src/app/components/Class/clasification';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-seguimiento-view',
  templateUrl: './seguimiento-view.component.html',
  styleUrls: ['./seguimiento-view.component.css'],
  providers: [Clasification],
})
export class SeguimientoViewComponent implements OnInit {
  formularioFormGroup!: FormGroup;
  arrayData!: any;
  formCode!: any;

  sectors!: any;
  subsectors!: any;

  editMode = false;
  isEdit = true;
  isSave = false;
  isCerrar = true;
  isCancel = false;
  otrosEsp = false;
  isDesicion = false;

  constructor(
    public uApi: ApiService,
    public _formBuilder: FormBuilder,
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
      this.getAllSectors();
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

      segData29: [null, [Validators.required]],
      segData30: [null, Validators.required],
    });
  }

  postFormData() {
    let datos = '';
    this.formularioFormGroup.controls['segData04'].setValue(null);
    this.formularioFormGroup.controls['segData05'].setValue(null);
    Object.keys(this.formularioFormGroup.controls).forEach((key) => {
      datos = datos + this.formularioFormGroup.controls[key].value + ',';
    });
    let dataArray = {
      opcion: '14',
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

  getAllSectors() {
    this.uApi.getAllSectors('').subscribe((res) => {
      this.sectors = res;
    });
  }

  getSubSectors(event: any) {
    this._clasificacion.sector = event.value;
    if (this._clasificacion.sector == '999') {
      this.formularioFormGroup.controls['segData30'].setValue('');
      this.formularioFormGroup.controls['segData30'].disable();
      this.formularioFormGroup.controls['segData06'].enable();
      this.formularioFormGroup.controls['segData07'].enable();
    } else {
      this.formularioFormGroup.controls['segData06'].setValue('No aplica');
      this.formularioFormGroup.controls['segData06'].disable();
      this.formularioFormGroup.controls['segData07'].setValue('No aplica');
      this.formularioFormGroup.controls['segData07'].disable();
      this.formularioFormGroup.controls['segData30'].enable();

      this.callSubSectors(this._clasificacion.sector);
    }
  }

  callSubSectors(data: any) {
    this.uApi.getSubSector(data).subscribe((res) => {
      this.subsectors = res;
    });
  }

  getSubSector(event: any) {
    this._clasificacion.subsector = event.value;
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
      this.formularioFormGroup.controls['segData06'].disable();
      this.formularioFormGroup.controls['segData07'].disable();
    }
  }

  closeForm() {
    this.router.navigate(['/home/ListOfficer']);
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
}
