import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestApi } from 'src/assets/restApi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private httCliente : HttpClient 
    ) { 
    
  }

  ValidarRut(rutEmpresa):Observable<any>{
    const endPoint= RestApi.Login.endPoint+RestApi.Login.methods.ValidarRut;
    let headers = new HttpHeaders(RestApi.Headers.headerJson);
    let token = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    })

    return this.httCliente.get(endPoint+rutEmpresa,{headers : token});
  }

  ValidarPassword(empresa):Observable<any>{
    const endPoint= RestApi.Login.endPoint+RestApi.Login.methods.ValidarPassword;
    let token = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    })
    let empresaJSON = JSON.stringify(empresa)
    return this.httCliente.post(endPoint,empresaJSON, {headers : token});
  }
}
