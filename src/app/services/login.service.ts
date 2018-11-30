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
    let token = RestApi.Headers.headerJsonToken;

    return this.httCliente.get(endPoint+rutEmpresa,{headers : token});
  }

  ValidarPassword(empresa):Observable<any>{
    const endPoint= RestApi.Login.endPoint+RestApi.Login.methods.ValidarPassword;
    let token = RestApi.Headers.headerJsonToken;
    let empresaJSON = JSON.stringify(empresa)
    return this.httCliente.post(endPoint,empresaJSON, {headers : token});
  }
}
