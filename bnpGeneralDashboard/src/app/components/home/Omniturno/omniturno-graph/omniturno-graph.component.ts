import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-omniturno-graph',
  templateUrl: './omniturno-graph.component.html',
  styleUrls: ['./omniturno-graph.component.css'],
})
export class OmniturnoGraphComponent implements OnInit {
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
  title!: string;
  showDataTable = false;
  datatableOption!: any;
  seccionTitle!: any;

  arrayData!: any;
  arraySecciones!: any;
  xAxisData: string[] = [];
  yAxisData: number[] = [];
  zAxisData: number[] = [];
  AxisData: any[] = [];

  _echartOption!: EChartsOption;

  dtOptions: any = {};

  colors = ['#5470C6', '#91CC75', '#EE6666'];

  ngOnInit(): void {
    this._auth.validateToken();
    this.tokenPayload = this._auth.getTokenPayload();
    this.getChartData();
  }

  getChartData() {
    this._api.callOmniChart(this.option).subscribe((res) => {
      this.arrayData = res;
      if (this.option == '1') {
        this.datatableOption = '1';
        this.showTurnosChart();
        this.showDataTableHTML();
      } else if (this.option == '2') {
        this.datatableOption = '2';
        this.showAtencionChart();
        this.showDataTableHTML();
      } else if (this.option == '3') {
        this.datatableOption = '3';
        this.getSeccionesData();
        this.showColaboradorChart();
        this.showDataTableHTML();
      } else if ((this.option = '5')) {
        this.datatableOption = '5';
        this.showTramitesChart();
        this.showDataTableHTML();
      }
    });
  }

  showTurnosChart() {
    this.title = 'Gráfico Empleado / Cantidad Atendido';
    let maxlenghtData = this.arrayData.length;
    for (let i = 0; i < maxlenghtData; i++) {
      this.xAxisData.push(this.arrayData[i].EMPLEADO);
      this.yAxisData.push(this.arrayData[i].CANTIDAD_ATENDIDA);
    }

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
        axisLabel: { interval: 0, rotate: 18, fontSize: 9 },
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: [
        {
          type: 'value',
          name: 'Cantidad',
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: { color: this.colors[0] },
          },
        },
      ],
      series: [
        {
          name: 'Cantidad',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          data: this.yAxisData,
        },
      ],
    };
  }

  showAtencionChart() {
    this.title = 'Gráfico Promedio de Atención Semanal';
    let maxlenghtData = this.arrayData.length;
    for (let i = 0; i < maxlenghtData; i++) {
      let data = {
        value: this.arrayData[i].PROMEDIO,
        name: this.arrayData[i].EMPLEADO,
      };
      this.AxisData.push(data);
    }
    this._echartOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} ({d}%)',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: 'Promedio de Atención Semanal',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: this.AxisData,
        },
      ],
    };
  }

  showColaboradorChart() {
    this.title = 'Gráfico Atención por Colaborador Overall';
    let maxlenghtData = this.arrayData.length;
    for (let i = 0; i < maxlenghtData; i++) {
      this.xAxisData.push(this.arrayData[i].EMPLEADO);
      this.yAxisData.push(this.arrayData[i].MAYOR_TIEMPO);
      this.zAxisData.push(this.arrayData[i].MENOR_TIEMPO);
    }
    this._echartOption = {
      legend: {
        data: ['Mayor Tiempo', 'Menor Tiempo'],
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
          name: 'Mayor Tiempo (min)',
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: { color: this.colors[0] },
          },
        },

        {
          type: 'value',
          name: 'Menor Tiempo (min)',
          position: 'right',
          axisLine: {
            show: true,
            lineStyle: { color: this.colors[1] },
          },
        },
      ],
      series: [
        {
          name: 'Mayor Tiempo',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          data: this.yAxisData,
        },
        {
          name: 'Menor Tiempo',
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

  showTramitesChart() {
    this.title = 'Gráfico Total Trámites Atendidos';
    let maxlenghtData = this.arrayData.length;
    for (let i = 0; i < maxlenghtData; i++) {
      this.xAxisData.push(this.arrayData[i].SECCION);
      this.yAxisData.push(this.arrayData[i].CANTIDAD_ATENTIDO);
    }
    this._echartOption = {
      legend: {
        data: ['Cantidad Atendida'],
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
          name: 'Cantidad Atendida',
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: { color: this.colors[0] },
          },
        },
      ],
      series: [
        {
          name: 'Cantidad Atendida',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          data: this.yAxisData,
        },
      ],
    };
  }

  showDataTableHTML() {
    this.dtOptions = {
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: ['copy', 'print', 'excel'],
      responsive: true,
    };
    this.showDataTable = true;
  }

  getSeccionesData() {
    this._api.get('seccion').subscribe((res) => {
      this.arraySecciones = res;
    });
  }

  showNewSeccionData(seccion: string) {
    this.title = 'Grafico Atención por Colaborador - ' + seccion;
    this.seccionTitle = seccion;
    this.clearArrays();
    this._api.callOmniSeccionChart('4', seccion).subscribe((res) => {
      console.log(res);
      this.arrayData = res;
      let maxlenghtData = this.arrayData.length;
      for (let i = 0; i < maxlenghtData; i++) {
        this.xAxisData.push(this.arrayData[i].EMPLEADO);
        this.yAxisData.push(this.arrayData[i].MAYOR_TIEMPO);
        this.zAxisData.push(this.arrayData[i].MENOR_TIEMPO);
      }
      this._echartOption = {
        legend: {
          data: ['Mayor Tiempo', 'Menor Tiempo'],
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
            name: 'Mayor Tiempo',
            position: 'left',
            axisLine: {
              show: true,
              lineStyle: { color: this.colors[0] },
            },
          },

          {
            type: 'value',
            name: 'Menor Tiempo',
            position: 'right',
            axisLine: {
              show: true,
              lineStyle: { color: this.colors[1] },
            },
          },
        ],
        series: [
          {
            name: 'Mayor Tiempo',
            type: 'bar',
            emphasis: {
              focus: 'series',
            },
            data: this.yAxisData,
          },
          {
            name: 'Menor Tiempo',
            type: 'bar',
            emphasis: {
              focus: 'series',
            },
            yAxisIndex: 1,
            data: this.zAxisData,
          },
        ],
      };
    });
  }

  clearArrays() {
    this.xAxisData.length = 0;
    this.yAxisData.length = 0;
    this.zAxisData.length = 0;
  }

  goBack() {
    this._router.navigate(['/home/omniturno']);
  }
}
