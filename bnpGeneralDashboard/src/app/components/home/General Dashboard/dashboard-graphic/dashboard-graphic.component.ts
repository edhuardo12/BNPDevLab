import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard-graphic',
  templateUrl: './dashboard-graphic.component.html',
  styleUrls: ['./dashboard-graphic.component.css'],
})
export class DashboardGraphicComponent implements OnInit {
  constructor(
    private _router: Router,
    private _api: ApiService,
    private _auth: AuthService
  ) {
    const navigation = this._router.getCurrentNavigation();
    const state = navigation!.extras.state as {
      option: string;
      producto: string;
    };
    this.option = state.option;
    this.producto = state.producto;
  }

  tokenPayload: any;
  option!: any;
  producto!: any;
  activeProduct = false;
  showKPIResult = false;
  showKPIChartsTable = false;
  showDataTablePassive = false;
  kpiBranchSelected!: any;
  generalBranchSelected!: any;
  title!: string;

  colors = ['#5470C6', '#91CC75', '#EE6666'];
  arrayData!: any;
  arraySucursales!: any;
  arrayRegiones!: any;
  arrayDataTable!: any;
  xAxisData: string[] = [];
  yAxisData: number[] = [];
  zAxisData: number[] = [];

  _echartOption!: EChartsOption;
  _echartOption2!: EChartsOption;
  dtOptions: any = {};

  ngOnInit(): void {
    this.title = 'Gráfico Relación Monto / Cantidad';
    this._auth.validateToken();
    this.tokenPayload = this._auth.getTokenPayload();
    this.getRegiones();
    if (this.option == '1' || this.option == '2' || this.option == '3') {
      this.activeProduct = true;
      this.getChartDataActive();
    } else {
      this.activeProduct = false;
      this.getChartDataPasive();
    }
  }

  getChartDataActive() {
    this._api
      .callGetSummaryChart(this.option, this.tokenPayload.branch)
      .subscribe(
        (res) => {
          this.arrayData = res;
          let maxlenghtData = this.arrayData.length;
          for (let i = 0; i < maxlenghtData; i++) {
            this.xAxisData.push(this.arrayData[i].subproducto);
            this.yAxisData.push(this.arrayData[i].monto);
            this.zAxisData.push(this.arrayData[i].cantidad);
          }
          this.iniChartDataActive();
        },
        (err) => console.log(err)
      );
  }

  getChartDataPasive() {
    this._api
      .callGetSummaryChart(this.option, this.tokenPayload.branch)
      .subscribe(
        (res) => {
          this.arrayData = res;
          let maxlenghtData = this.arrayData.length;
          for (let i = 0; i < maxlenghtData; i++) {
            this.xAxisData.push(this.arrayData[i].subproducto);
            this.yAxisData.push(this.arrayData[i].cantidad);
          }
          this.iniChartDataPasive();
          this.iniDataTablePassive();
        },
        (err) => console.log(err)
      );
  }

  iniDataTable() {
    this.dtOptions = {
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: ['copy', 'print', 'excel'],
      responsive: true,
    };
    this.showKPIChartsTable = true;
  }

  iniDataTablePassive() {
    this.dtOptions = {
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: ['copy', 'print', 'excel'],
      responsive: true,
    };
    this.showDataTablePassive = true;
  }

  iniChartDataActive() {
    this._echartOption = {
      legend: {
        data: ['Monto', 'Cantidad'],
        align: 'left',
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: true },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
        orient: 'vertical',
      },
      xAxis: {
        type: 'category',
        data: this.xAxisData,
        axisLabel: { interval: 0, rotate: 18, fontSize: 9 },
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: [
        {
          type: 'value',
          name: 'B/.',
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: { color: this.colors[0] },
          },
        },

        {
          type: 'value',
          name: 'Cantidad',
          position: 'right',
          axisLine: {
            show: true,
            lineStyle: { color: this.colors[1] },
          },
        },
      ],
      series: [
        {
          name: 'Monto',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          data: this.yAxisData,
        },
        {
          name: 'Cantidad',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          yAxisIndex: 1,
          data: this.zAxisData,
        },
      ],
    };
  }

  iniChartDataPasive() {
    this._echartOption = {
      legend: {
        data: ['Cantidad'],
        align: 'left',
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: true },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
        orient: 'vertical',
      },

      xAxis: {
        type: 'category',
        data: this.xAxisData,
        axisLabel: { interval: 0, rotate: 18, fontSize: 13 },
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: [
        {
          type: 'value',
          name: 'Cantidad',
          axisTick: {},
        },
      ],
      series: [
        {
          name: 'Cantidad',
          type: 'bar',
          data: this.yAxisData,
        },
      ],
    };
  }

  iniChartDataKPI(_value: any) {
    let value = _value;
    this.showKPIResult = true;
    if (value == undefined) {
      value = 0;
    }
    this._echartOption2 = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: 'KPI Indicator',
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.3, '#fd666d'],
                [0.7, '#efff00'],
                [1, '#06ea54'],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: 'auto',
            },
          },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 2,
            },
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: {
              color: '#fff',
              width: 4,
            },
          },
          axisLabel: {
            color: 'auto',
            distance: 40,
            fontSize: 20,
          },
          detail: {
            valueAnimation: true,
            formatter: '{value} %',
            color: 'auto',
          },
          data: [
            {
              value: value,
            },
          ],
        },
      ],
    };
  }

  getSucursales(zone: string) {
    this._api.callGetBranchByZone(zone).subscribe(
      (res) => (this.arraySucursales = res),
      (err) => console.log(err)
    );
  }

  getRegiones() {
    this._api.get('region').subscribe(
      (res) => (this.arrayRegiones = res),
      (err) => console.log(err)
    );
  }

  getKPISelected() {
    this._api
      .callKPISumarryChart(this.option, this.kpiBranchSelected)
      .subscribe(
        (res) => {},
        (err) => console.log(err)
      );
  }

  getBranchNumber(branch: string) {
    this.kpiBranchSelected = branch;
    this._api
      .callKPISumarryChart(this.option, this.kpiBranchSelected)
      .subscribe((res) => this.iniChartDataKPI(res[0].primedio));
  }

  searchByBranch(branch: string) {
    this.generalBranchSelected = branch;
    let branchArray: string[] = this.generalBranchSelected.split('-');
    this.title = 'Gráfico Relación Monto / Cantidad' + ' - ' + branchArray[1];
    this.clearArrays();
    if (this.option == '1' || this.option == '2' || this.option == '3') {
      this._api.callGetSummaryChart(this.option, branchArray[0]).subscribe(
        (res) => {
          this.arrayData = res;
          let maxlenghtData = this.arrayData.length;
          for (let i = 0; i < maxlenghtData; i++) {
            this.xAxisData.push(this.arrayData[i].subproducto);
            this.yAxisData.push(this.arrayData[i].monto);
            this.zAxisData.push(this.arrayData[i].cantidad);
          }
          this.iniChartDataActive();
        },
        (err) => console.log(err)
      );
      this._api
        .callKPISumarryChart(this.option, branchArray[0])
        .subscribe((res) => {
          this.iniChartDataKPI(res[0].promedio);
          this.arrayDataTable = res;
          this.iniDataTable();
        });
    } else {
      this._api.callGetSummaryChart(this.option, branchArray[0]).subscribe(
        (res) => {
          this.arrayData = res;
          let maxlenghtData = this.arrayData.length;
          for (let i = 0; i < maxlenghtData; i++) {
            this.xAxisData.push(this.arrayData[i].subproducto);
            this.yAxisData.push(this.arrayData[i].cantidad);
          }
          this.iniChartDataPasive();
          this.iniDataTablePassive();
        },
        (err) => console.log(err)
      );
      if (this.option == '4' || this.option == '5') {
        this._api
          .callKPISumarryChart(this.option, branchArray[0])
          .subscribe((res) => {
            this.iniChartDataKPI(res[0].promedio);
            this.arrayDataTable = res;
            this.iniDataTable();
          });
      }
    }
  }

  clearArrays() {
    this.xAxisData.length = 0;
    this.yAxisData.length = 0;
    this.zAxisData.length = 0;
  }

  goBack() {
    this._router.navigate(['/home/general']);
  }
}
