import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reporte-clasificacion',
  templateUrl: './reporte-clasificacion.component.html',
  styleUrls: ['./reporte-clasificacion.component.css'],
  providers: [DatePipe],
})
export class ReporteClasificacionComponent implements OnInit {
  mydate = new Date();
  arraydata!: any;
  currentdate: any;
  dtOptions!: any;
  datatable = false;
  constructor(private uApi: ApiService, private _datepie: DatePipe) {
    this.currentdate = this._datepie.transform(this.mydate, 'dd-MM-yyyy');
  }

  ngOnInit(): void {
    this.uApi.callGetExecute('25', '').subscribe((res) => {
      this.arraydata = res;
      this.iniDatatable();
    });
  }

  iniDatatable() {
    this.dtOptions = {
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: ['copy', 'print', 'excel'],
    };
    this.datatable = true;
  }
}
