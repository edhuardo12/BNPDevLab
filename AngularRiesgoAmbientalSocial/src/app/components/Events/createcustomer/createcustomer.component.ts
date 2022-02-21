import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from '../../Class/customer';

@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css'],
  providers: [Customer],
})
export class CreatecustomerComponent implements OnInit {
  showUserDataGroup = false;
  customerNumberExist = false;
  customerNumberNoExist = false;
  zoneValue: any;
  userGeneralData!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private uApi: ApiService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreatecustomerComponent>,
    public _customer: Customer
  ) {}

  ngOnInit(): void {
    this.zoneValue = 1;
    this.userGeneralData = this._formBuilder.group({
      customerNumer: [
        null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      customerInputType: [null, [Validators.required]],
      customerName: [null, [Validators.required]],
      customerCity: [null, [Validators.required]],
      customerDepartment: [null, [Validators.required]],
      bankBranch: [null, [Validators.required]],
      bankOfficerName: [null, [Validators.required]],
    });
  }

  validateCustomerNumber(customerNumber: string) {
    this.uApi.validateCustomerNumber(customerNumber).subscribe((res) => {
      let result = res[0].resultado;
      if (result == 'TRUE') {
        this.showUserDataGroup = false;
        this.customerNumberExist = true;
        this.customerNumberNoExist = false;
        this._snackBar.open(
          'El número de cliente ingresado ya existe!',
          'Cerrar',
          {
            duration: 3 * 1000,
          }
        );
      } else {
        this.userGeneralData.controls['customerNumer'].disable();
        this.showUserDataGroup = true;
        this.customerNumberExist = false;
        this.customerNumberNoExist = true;
      }
    });
  }

  setCustomerClass() {
    this._customer.customerNumber =
      this.userGeneralData.controls['customerNumer'].value;
    this._customer.customerType =
      this.userGeneralData.controls['customerInputType'].value;
    this._customer.customerName =
      this.userGeneralData.controls['customerName'].value;
    this._customer.customerCity =
      this.userGeneralData.controls['customerCity'].value;
    this._customer.customerDepartment =
      this.userGeneralData.controls['customerDepartment'].value;
    this._customer.customerZone = this.zoneValue;
    this._customer.bankBranch =
      this.userGeneralData.controls['bankBranch'].value;
    this._customer.bankOfficerName =
      this.userGeneralData.controls['bankOfficerName'].value;

    this.postCustomerData();
  }

  postCustomerData() {
    let data = {
      opcion: 1,
      SQLStr:
        this._customer.customerNumber +
        ',' +
        this._customer.customerType +
        ',' +
        this._customer.customerName +
        ',' +
        this._customer.customerCity +
        ',' +
        this._customer.customerDepartment +
        ',' +
        this._customer.customerZone +
        ',' +
        this._customer.bankBranch +
        ',' +
        this._customer.bankOfficerName +
        ',' +
        localStorage.getItem('username'),
    };

    this.uApi.postNewCustomerData(data).subscribe((res) => {
      this.dialogRef.close({ event: 'Done' });
    });
  }

  setZoneValue(opcion: number) {
    this.zoneValue = opcion;
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
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
