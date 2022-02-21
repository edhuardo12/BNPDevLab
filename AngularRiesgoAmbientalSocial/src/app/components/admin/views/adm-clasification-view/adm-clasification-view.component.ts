import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommentDialogComponent } from 'src/app/components/Events/comment-dialog/comment-dialog.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-adm-clasification-view',
  templateUrl: './adm-clasification-view.component.html',
  styleUrls: ['./adm-clasification-view.component.css'],
})
export class AdmClasificationViewComponent implements OnInit {
  arrayData!: any;
  displayFormGroup!: FormGroup;
  formCode!: any;
  sectors!: any;
  subsectors!: any;
  sectorView = true;
  selectorEdit = false;
  otherActivities = false;
  isDesicion = false;
  resultado_formula_riesgo!: any;
  isEdit = true;
  isSave = false;
  bgColor!: any;
  riesgoVentasAnuales!: any;
  riesgoExpoGrupo!: any;
  checklistRiesgo!: any;
  listItemChecked!: number;
  manualRiskSelected!: any;

  constructor(
    public uApi: ApiService,
    public _formBuilder: FormBuilder,
    public router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let form_clave = localStorage.getItem('form_code');
    this.formCode = form_clave;
    this.listItemChecked = 0;
    this.riesgoVentasAnuales = 0;
    this.riesgoExpoGrupo = 0;
    this.checklistRiesgo = 0;
    this.manualRiskSelected = null;
    this.uApi.getClasificationFormData(form_clave || '').subscribe((res) => {
      this.arrayData = res[0];
      this.displayFormGroup = this._formBuilder.group({
        customerNumberCtr: [
          this.arrayData.numero_cliente,
          [Validators.required],
        ],
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
        annualSalesCtr: [this.arrayData.ventas_anuales],
        creditAmountCtr: [this.arrayData.monto_credito],
        groupExposseCtr: [this.arrayData.exposicion_grupo],
        resutlRiesgoSocial: [this.arrayData.resultados_riesgo_social],
        resultNivelRiesgoSocial: [this.arrayData.resultado_nivel_riesgo_social],
      });
      this.resultado_formula_riesgo = this.arrayData.resultados_riesgo_social;
      this.turnEdition();
      this.getRegistStatus();
    });
  }

  turnEdition() {
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
    this.displayFormGroup.controls['resutlRiesgoSocial'].disable();
    this.displayFormGroup.controls['resultNivelRiesgoSocial'].disable();
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
