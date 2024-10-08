import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host } from '../constants';
import { ResultModel } from '../models/result.model';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor
    (
      private http: HttpClient,
      private auth: AuthService,
      private error: ErrorService

    ){ }

  post<T>(apiurl: string, body: any, callBack: (res: T) => void, errorCallback?: () => void) {
    this.http.post<ResultModel<T>>(`${host}/${apiurl}`, body, {
      headers: {
        Authorization: "Bearer " + this.auth.token
      }
    }).subscribe({
      next: (res: any) => {
        if (res.data) {
          callBack(res.data)
        }
      }
      ,

      error: (error: HttpErrorResponse) => {
        this.error.errorHandler(error)
        if (errorCallback) {
          errorCallback()
        }
      }
    })
  }
}
