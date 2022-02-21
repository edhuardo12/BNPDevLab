import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationComponent } from 'src/app/components/events/confirmation/confirmation.component';
import { TicketDetail } from 'src/app/interfaces/ticket-detail';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css'],
})
export class EditTicketComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditTicketComponent>,
    private _sb: MatSnackBar,
    private _dialog: MatDialog,
    private fb: FormBuilder,
    public uApi: ApiService,
    private _auth: AuthService,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ticketDetail: TicketDetail;
    }
  ) {}

  TicketNumber!: any;

  tokenPayload!: any;

  currentRole!: any;

  arrayData1!: any;
  arrayData2!: any;
  arrayData3!: any;
  arrayData4!: any;
  arrayData5!: any;
  arrayData6!: any;
  arrayData7!: any;

  ngOnInit(): void {
    this.tokenPayload = this._auth.getTokenPayload();
    this.currentRole = this.tokenPayload.role;
    this.TicketNumber = this.data.ticketDetail.ticket_number;
    this.getOriginTicketData();
    this.ticketInfromationForm.controls['ticketNumber'].disable();
  }

  ticketInfromationForm = this.fb.group({
    ticketNumber: this.data.ticketDetail.ticket_number,
    ticketOrigin: this.data.ticketDetail.origen_ticket || 0,
    teamCentral: this.data.ticketDetail.team_central || 0,
    gerenciaEjecutiva: this.data.ticketDetail.fk_id_gerencia || 0,
    correoUsuario: this.data.ticketDetail.correo_usuario || 'No Definido',
    reqPor: this.data.ticketDetail.fk_id_requerido || 0,
    numInforme: this.data.ticketDetail.num_informe || 'No Definido',
    manualReq: this.data.ticketDetail.nombre_doc || 'No Definido',
    detalles: this.data.ticketDetail.resumen || '',
    comentarios: this.data.ticketDetail.comments,
  });

  getOriginTicketData() {
    this.uApi.callGetExecute('51', 'ticket_origen').subscribe(
      (res) => (this.arrayData1 = res),
      (err) => console.log(err)
    );
    this.uApi.callGetExecute('51', 'team_central').subscribe(
      (res) => (this.arrayData2 = res),
      (err) => console.log(err)
    );
    this.uApi.callGetExecute('51', 'gerencia_ejecutiva').subscribe(
      (res) => (this.arrayData3 = res),
      (err) => console.log(err)
    );
    this.uApi.callGetExecute('51', 'req_por').subscribe(
      (res) => (this.arrayData4 = res),
      (err) => console.log(err)
    );
  }

  onSubmit(): void {
    this.confirm(
      'Confirmar',
      '¿Segur@ que deseas continuar con esta acción?',
      () => {
        this._sb.open('Un momento por favor...', 'OK');
        let validate: any;
        let datos = '';
        Object.keys(this.ticketInfromationForm.controls).forEach((key) => {
          validate = this.ticketInfromationForm.controls[key].value;
          if (validate == 0 || validate == 'No Definido' || validate == '') {
            datos = datos + null + '|';
          } else {
            datos =
              datos + this.ticketInfromationForm.controls[key].value + '|';
          }
        });

        let dataArray = {
          option: '1',
          SQLStr: datos.substring(0, datos.length - 1),
        };

        this.uApi.callPostExecute(dataArray).subscribe(
          (res) => {
            this.dialogRef.close('true');
            this._sb.open('Listo', 'OK', { duration: 3000 });
          },
          (error) => {
            this._sb.open('Error', 'Entendido', { duration: 3000 });
          }
        );
      }
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

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}
