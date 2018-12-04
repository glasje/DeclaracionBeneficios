import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propietario } from '../models/propietario';
import { RestApi } from 'src/assets/restApi';
import { Empresa } from '../models/empresa';
import { Declarante } from '../models/declarante';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {
  lstBeneficiarios: Propietario[];
  propietario: Propietario;
  porcentajeAcumulado: number;
  empresa: any;
  declarante : Declarante
  constructor(private httCliente: HttpClient) {
    this.propietario = new Propietario();
    this.lstBeneficiarios = [];
    this.porcentajeAcumulado = 0;
    this.declarante= new Declarante();
  }

  ObtenerPropietario(ideDecla): Observable<any> {

    const url = RestApi.Declarante.endPoint + RestApi.Declarante.methods.ObtenerPropietario;

    let id = { "ideDecla": parseInt(ideDecla) }
    let token = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    })
    return this.httCliente.post(url, id, { headers: token });
  }

  GuardarPropietario(propietario: Propietario): Observable<any> {
    const url = RestApi.Declarante.endPoint + RestApi.Declarante.methods.GuardarPropietario;
    let token = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    })
    return this.httCliente.post(url, propietario, { headers: token });
  }

  AgregarBeneficiario(beneficiario): Propietario[] {
    this.lstBeneficiarios.push(beneficiario);

    return this.lstBeneficiarios;
  }

  EliminarBeneficiario(beneficiario): Observable<any> {
    const url = RestApi.Declarante.endPoint + RestApi.Declarante.methods.EliminarPropietario;
    let token = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    })
    let id = { "idProp": beneficiario }
    return this.httCliente.post(url, id, { headers: token });
  }

  EnviarDeclaracion(declaracion){
    const url = RestApi.Declarante.endPoint + RestApi.Declarante.methods.EnviarDeclaracion;
    let token = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    })
    return this.httCliente.post(url, declaracion, { headers: token });
  }

  ObtenerDeclaracion(ideDeclaracion):Observable<any>{
    const url = RestApi.Declarante.endPoint + RestApi.Declarante.methods.ObtenerDeclaracion;
    let token = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    })
    return this.httCliente.post(url, {ideDecla :parseInt(ideDeclaracion)}, { headers: token });
  }
}
