import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  /* Get functions Zone  */

  callGetExecute(opcion: string, dataArray: string) {
    const httpParms = new HttpParams({
      fromObject: {
        option: opcion,
        SQLStr: dataArray,
      },
    });
    return this.http.get<any>(this.url + 'get', {
      params: httpParms,
    });
  }

  // consulta para obtener los comentarios segun ticket y accion especifica

  callGetComments(opcion: string, dataArray: any) {
    const httpParms = new HttpParams({
      fromObject: {
        option: opcion,
        SQLStr: dataArray._ticketNumber,
        step: dataArray._step,
      },
    });
    return this.http.get<any>(this.url + 'get', {
      params: httpParms,
    });
  }

  /*-------------------------------------------------------------------------------------------------------------------------*/

  callPostExecute(dataArray: any) {
    return this.http.post<any>(this.url + 'post', dataArray);
  }

  callPostAssigments(dataArray: any) {
    const httpParms = new HttpParams({
      fromObject: {
        option: dataArray.option,
        userCode: dataArray._userCode,
        ticketNumber: dataArray._ticketNumber,
        assigmentCode: dataArray._assigmentCode,
        fechaPromesa: dataArray._fechaPromesa,
      },
    });

    return this.http.post<any>(this.url + 'post', httpParms);
  }

  callPostComments(dataArray: any) {
    const httpParms = new HttpParams({
      fromObject: {
        option: dataArray.option,
        userCode: dataArray._userCode,
        ticketNumber: dataArray._ticketNumber,
        step: dataArray._step,
        comment: dataArray._comment,
        closeAction: dataArray._closeAction,
      },
    });

    return this.http.post<any>(this.url + 'post', httpParms);
  }
}
