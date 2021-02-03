import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  apiCommonURL ="http://localhost:3000/"

  register(data):Observable<any>{
    return this._http.post(`${this.apiCommonURL}user/register`,data)
  }
}
