import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { data } from 'jquery';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // url = 'http://10.5.1.190:3000/api/remediation/';
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}
  // -----------------------------------------------------------------------------------------------------------------------------------
  // GET AREA
  // -----------------------------------------------------------------------------------------------------------------------------------
  getNewUniqueKey(dataArray: string) {
    const httpParams = new HttpParams({
      fromObject: {
        opcion: '1',
        SQLStr: dataArray,
      },
    });
    return this.http.get<any>(this.url + 'get', {
      params: httpParams,
    });
  }

  validateCustomerNumber(dataArray: string) {
    const httpParams = new HttpParams({
      fromObject: {
        opcion: '2',
        SQLStr: dataArray,
      },
    });
    return this.http.get<any>(this.url + 'get', { params: httpParams });
  }

  getAllSectors(dataArray: string) {
    const httpParams = new HttpParams({
      fromObject: {
        opcion: '3',
        SQLStr: dataArray,
      },
    });
    return this.http.get<any>(this.url + 'get', {
      params: httpParams,
    });
  }

  getSubSector(dataArray: string) {
    const httpParams = new HttpParams({
      fromObject: {
        opcion: '4',
        SQLStr: dataArray,
      },
    });
    return this.http.get<any>(this.url + 'get', {
      params: httpParams,
    });
  }

  getCurrenUsersTickets(dataArray: string) {
    const httpParms = new HttpParams({
      fromObject: {
        opcion: '5',
        SQLStr: dataArray,
      },
    });
    return this.http.get<any>(this.url + 'get', {
      params: httpParms,
    });
  }

  getCurrentSubTickets(dataArray: string) {
    const httpParms = new HttpParams({
      fromObject: {
        opcion: '6',
        SQLStr: dataArray,
      },
    });
    return this.http.get<any>(this.url + 'get', {
      params: httpParms,
    });
  }

  getClasificationFormData(dataArray: string) {
    const httpParms = new HttpParams({
      fromObject: {
        opcion: '7',
        SQLStr: dataArray,
      },
    });
    return this.http.get<any>(this.url + 'get', {
      params: httpParms,
    });
  }

  getRegistredClients(dataArray: string) {
    const httpParms = new HttpParams({
      fromObject: {
        opcion: '8',
        SQLStr: dataArray,
      },
    });
    return this.http.get<any>(this.url + 'get', {
      params: httpParms,
    });
  }

  callGetExecute(option: string, dataArray: string) {
    const httpParms = new HttpParams({
      fromObject: {
        opcion: option,
        SQLStr: dataArray,
      },
    });
    return this.http.get<any>(this.url + 'get', {
      params: httpParms,
    });
  }

  // -----------------------------------------------------------------------------------------------------------------------------------
  // POST AREA
  // -----------------------------------------------------------------------------------------------------------------------------------
  
  postNewCustomerData(dataArray: any) {
    return this.http.post<any>(this.url + 'post', dataArray);
  }

  callPostExecute(dataArray: any) {
    return this.http.post<any>(this.url + 'post', dataArray);
  }
}
