import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propietario } from '../models/propietario';
import { RestApi } from 'src/assets/restApi';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {
  lstBeneficiarios: Propietario[];
  propietario: Propietario;
  porcentajeAcumulado: number;
  empresa: any;
  constructor(private httCliente: HttpClient) {
    this.propietario = new Propietario();
    this.lstBeneficiarios = [];
    this.porcentajeAcumulado = 0;
  }

  ObtenerPropietario(empresa: Empresa): Observable<any> {

    const url = RestApi.Declarante.endPoint + RestApi.Declarante.methods.ObtenerPropietario;

    let id = { "ideDecla": empresa.ideDecla }
    let token = RestApi.Headers.headerJsonToken;
    return this.httCliente.post(url, id, { headers: token });
  }

  GuardarPropietario(propietario: Propietario): Observable<any> {
    const url = RestApi.Declarante.endPoint + RestApi.Declarante.methods.GuardarPropietario;
    let token = RestApi.Headers.headerJsonToken;

    return this.httCliente.post(url, propietario, { headers: token });
  }

  ObtenerBeneficiarios(): Propietario[] {

    return this.lstBeneficiarios;
  }

  AgregarBeneficiario(beneficiario): Propietario[] {
    this.lstBeneficiarios.push(beneficiario);

    return this.lstBeneficiarios;
  }

  EliminarBeneficiario(beneficiario): Observable<any> {
    const url = RestApi.Declarante.endPoint + RestApi.Declarante.methods.EliminarPropietario;
    let token = RestApi.Headers.headerJsonToken;
    let id = { "idProp": beneficiario }
    return this.httCliente.post(url, id, { headers: token });
  }

  EnviarDeclaracion(declaracion){
    const url = RestApi.Declarante.endPoint + RestApi.Declarante.methods.EnviarDeclaracion;
    let token = RestApi.Headers.headerJsonToken;
    return this.httCliente.post(url, declaracion, { headers: token });
  }
}
