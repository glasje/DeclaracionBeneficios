import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from 'src/assets/token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenJwtService {
 private credenciales={
  UserName:"",
  Password:""
}
  constructor(private _httClient : HttpClient ) { 
    
    this.GetCredenciales();

  }


  GetCredenciales(){
    this.credenciales.UserName = Token.TokenLogin.UserName;
    this.credenciales.Password =  Token.TokenLogin.Password;
  }


  GetToken(){
    return sessionStorage.getItem("token");
  }
  GetTokenByService():Observable<any>{

    const endPoint= Token.LoginAuth.EndPoint+Token.LoginAuth.Method;
    let headers = new HttpHeaders(Token.Headers.headerJson);
    let credencialesJSON = JSON.stringify(this.credenciales)
    return this._httClient.post(endPoint,credencialesJSON, { headers: headers });

    //sessionStorage.setItem("token",token);
  }
  SetToken(token){
    sessionStorage.setItem("token",token);
  }
  ClearToken(){
    sessionStorage.removeItem("token");
  }

  GetIdDecla(){
    return sessionStorage.getItem("idDecla");
  }
  SetIdDecla(idDecla){
    sessionStorage.setItem("idDecla",idDecla);
  }

  GetIdEmp(){
    return sessionStorage.getItem("idEmp");
  }
  SetIdEmp(idEmp){
    sessionStorage.setItem("idEmp",idEmp);
  }
}
