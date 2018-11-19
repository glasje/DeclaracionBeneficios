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
    const endPoint= RestApi.Login.urlLogin+RestApi.Login.endPointValidarRut;
    return this.httCliente.get(endPoint+rutEmpresa);
  }

  ValidarPassword(empresa):Observable<any>{
    const endPoint= RestApi.Login.urlLogin+RestApi.Login.endPointValidarPassword;
    let headers = new HttpHeaders(RestApi.Login.headersJson);

    return this.httCliente.post(endPoint,empresa, { headers: headers });
  }
}
