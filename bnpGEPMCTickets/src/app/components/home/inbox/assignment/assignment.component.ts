import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmationComponent } from 'src/app/components/events/confirmation/confirmation.component';
import { TicketDetail } from 'src/app/interfaces/ticket-detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],
})
export class AssignmentComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AssignmentComponent>,
    private _dialog: MatDialog,
    private _router: Router,
    private _sb: MatSnackBar,
    private fb: FormBuilder,
    public uApi: ApiService,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ticketDetail: TicketDetail;
    }
  ) {}

  TicketNumber!: any;

  arrayData1!: any;
  arrayData2!: any;
  arrayData3!: any;
  arrayData4!: any;

  slaSpecial = false;

  assigmentForm = this.fb.group({
    assigmentAction: null,
    setDepartment: null,
    setAnalyst: null,
    commentAssigment: null,
    setAssignment: null,
  });

  showAsignar = false;
  showRechazar = false;

  fechaPromesa!: string;

  ngOnInit(): void {
    this.TicketNumber = this.data.ticketDetail.ticket_number;
    this.getFieldData();
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  onSubmit(): void {
    this.confirm(
      'Confirmar',
      '¿Segur@ que deseas continuar con esta acción?',
      () => {
        this._sb.open('Un momento por favor...', 'OK');
        let validate: any;
        let datos = '';
        datos = this.data.ticketDetail.ticket_number.toString() + '|';
        Object.keys(this.assigmentForm.controls).forEach((key) => {
          validate = this.assigmentForm.controls[key].value;
          if (
            validate == 0 ||
            validate == 'No Definido' ||
            validate == '' ||
            validate == null
          ) {
            datos = datos + null + '|';
          } else {
            datos = datos + this.assigmentForm.controls[key].value + '|';
          }
        });

        datos = datos + this.fechaPromesa + '|';

        let dataArray = {
          option: '2',
          SQLStr: datos.substring(0, datos.length - 1),
        };

        let dataArray2 = {
          option: '3',
          _userCode: this.assigmentForm.controls['setAnalyst'].value,
          _ticketNumber: this.TicketNumber,
          _assigmentCode: this.assigmentForm.controls['setAssignment'].value,
          _fechaPromesa: this.fechaPromesa,
        };

        this.postData(dataArray2, () => {
          this.uApi.callPostExecute(dataArray).subscribe(
            (res) => {
              this.dialogRef.close('true');
              this._sb.open('Listo', 'OK', { duration: 3000 });
            },
            (error) => {
              this._sb.open('Error', 'Entendido', { duration: 3000 });
            }
          );
        });
      }
    );
  }

  postData(sendData: any, callback: any) {
    console.log(sendData);
    this.uApi.callPostAssigments(sendData).subscribe(
      (res) => {
        callback();
      },
      (err) => console.log(err)
    );
  }

  getFieldData() {
    this.uApi.callGetExecute('51', 'estado|1').subscribe(
      (res) => (this.arrayData1 = res),
      (err) => console.log(err)
    );
  }

  getDataChoose(value: any) {
    if (value == '3') {
      this.showAsignar = true;
      this.showRechazar = false;
      this.getDepartmentData();
    } else if (value == '4' || value == '5') {
      this.showAsignar = false;
      this.showRechazar = true;
    } else {
      this.showRechazar = false;
      this.showAsignar = false;
    }
  }

  getDepartmentData() {
    this.uApi.callGetExecute('51', 'departamentos').subscribe(
      (res) => (this.arrayData2 = res),
      (err) => console.log(err)
    );
  }

  setFechaPromesa(inputDate: string) {
    this.fechaPromesa = inputDate;
  }

  getAnalista(value: any) {
    this.uApi.callGetExecute('7', value).subscribe(
      (res) => (this.arrayData3 = res),
      (err) => console.log(err)
    );
  }

  specialSLA(value: any) {
    this.slaSpecial = value;
  }

  getAssignmentCodes(department_code: any) {
    this.uApi.callGetExecute('8', department_code).subscribe(
      (res) => (this.arrayData4 = res),
      (err) => console.log(err)
    );
  }

  confirm(title: string, content: string, callback: any) {
    let _dialogRef = this._dialog.open(ConfirmationComponent, {
      data: {
        title: title,
        content: content,
      },
    });

    _dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        callback();
      }
    });
  }
}
