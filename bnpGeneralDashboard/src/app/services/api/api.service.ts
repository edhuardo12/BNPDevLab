import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = environment.apiUrl;
  constructor(private _http: HttpClient) {}

  get(get: string) {
    const httpParams = new HttpParams({ fromObject: { get: get } });
    return this._http.get<any>(this.url + 'get', {
      params: httpParams,
    });
  }

  callGetSummaryChart(productType: string, branch: string) {
    const httpParms = new HttpParams({
      fromObject: {
        get: 'summary',
        productType: productType,
        branch: branch,
      },
    });
    return this._http.get<any>(this.url + 'get', {
      params: httpParms,
    });
  }

  callGetBranchByZone(_zone: string) {
    const httpParms = new HttpParams({
      fromObject: {
        get: 'sucursales',
        zone: _zone,
      },
    });
    return this._http.get<any>(this.url + 'get', {
      params: httpParms,
    });
  }

  callKPISumarryChart(option: string, branch: string) {
    const httpParms = new HttpParams({
      fromObject: {
        get: 'kpi',
        productType: option,
        branch: branch,
      },
    });
    return this._http.get<any>(this.url + 'get', {
      params: httpParms,
    });
  }

  callOmniChart(option: string) {
    const httpParms = new HttpParams({
      fromObject: {
        get: 'omniturno',
        productType: option,
      },
    });
    return this._http.get<any>(this.url + 'get', {
      params: httpParms,
    });
  }

  callOmniSeccionChart(option: string, _seccion: string) {
    const httpParms = new HttpParams({
      fromObject: {
        get: 'omniturno',
        productType: option,
        seccion: _seccion,
      },
    });
    return this._http.get<any>(this.url + 'get', {
      params: httpParms,
    });
  }
}
