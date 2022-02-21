import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css'],
})
export class ClientManagementComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<ClientManagementComponent>,
    private _dialog: MatDialog,
    private _sb: MatSnackBar,
    private _api: ApiService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
    }
  ) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('username') || '';
    this.getClients();
  }

  currentUser!: string;
  showFields = false;
  arrayDataClient!: any;
  clientNumber!: string;

  clientInformation = this._fb.group({
    clientName: ['', Validators.required],
    clientDirection: ['', Validators.required],
  });

  getClients() {
    this._api.callGetExecute('26', this.currentUser).subscribe((res) => {
      this.arrayDataClient = res;
    });
  }

  getClientinfo(clientNumber: string) {
    this.clientNumber = clientNumber;
    this._api.callGetExecute('27', clientNumber).subscribe((res) => {
      this.clientInformation.controls['clientName'].setValue(
        res[0].nombre_cliente
      );

      this.clientInformation.controls['clientDirection'].setValue(
        res[0].ciudad
      );
      this.showFields = true;
    });
  }

  sendConfirmation() {
    this.confirm(
      'Confirmar',
      'Todos los registros creados bajo este cliente serán modificados de la base de datos. ¿Segur@ que deseas continuar con esta acción?',
      () => {
        let dataArray = {
          opcion: 16,
          SQLStr:
            this.clientNumber +
            ',' +
            this.clientInformation.controls['clientName'].value +
            ',' +
            this.clientInformation.controls['clientDirection'].value,
        };
        this._sb.open('Un momento por favor...', 'OK');
        this._api.callPostExecute(dataArray).subscribe(
          (res) => {
            this._sb.open('Listo', 'OK', { duration: 3000 });
            this.closeDialog();
          },
          (err) => {
            this._sb.open('Error', 'Entendido', { duration: 3000 });
          }
        );
      }
    );
  }

  confirm(title: string, content: string, callback: any, bypass?: boolean) {
    if (bypass) {
      callback();
    } else {
      let dialogRef = this._dialog.open(ConfirmationDialogComponent, {
        data: { title: title, content: content },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'true') {
          callback();
        }
      });
    }
  }

  closeDialog() {
    this._dialogRef.close('closed');
  }
}
