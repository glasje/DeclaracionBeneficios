import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestApi } from 'src/assets/restApi';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httCliente : HttpClient ) { 
    
  }

  ValidarRut(rutEmpresa):Observable<any>{
    const endPoint= RestApi.Login.endPoint+RestApi.Login.methods.ValidarRut;
    return this.httCliente.get(endPoint+rutEmpresa);
  }

  ValidarPassword(empresa):Observable<any>{
    const endPoint= RestApi.Login.endPoint+RestApi.Login.methods.ValidarPassword;
    let headers = new HttpHeaders(RestApi.Headers.headerJson);

    return this.httCliente.post(endPoint,empresa, { headers: headers });
  }
}
