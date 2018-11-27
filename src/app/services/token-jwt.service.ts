import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenJwtService {

  constructor() { }
  GetToken(){
    return sessionStorage.getItem("token");

  }
  SetToken(token){
    sessionStorage.setItem("token",token);
  }
  ClearToken(){
    sessionStorage.clear();
  }
}
