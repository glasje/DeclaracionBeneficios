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
  
    
    const url = RestApi.Declarante.endPoint + RestApi.Declarante.methods.obtenerPropietario;
    let header = new HttpHeaders(RestApi.Headers.headerJson);
    return this.httCliente.post(url, empresa, { headers: header });
  }

  GuardarPropietario(propietario: Propietario): Observable<any> {
    const url = RestApi.Declarante.endPoint + RestApi.Declarante.methods.GuardarPropietario;
    let header = new HttpHeaders(RestApi.Headers.headerJson);

    return this.httCliente.post(url, propietario, { headers: header });
  }

  ObtenerBeneficiarios(): Propietario[] {

    return this.lstBeneficiarios;
  }

  AgregarBeneficiario(beneficiario): Propietario[] {
    this.lstBeneficiarios.push(beneficiario);

    return this.lstBeneficiarios;
  }

  EliminarBeneficiario(beneficiario): Propietario[] {
    let rut = beneficiario.rut;

    this.lstBeneficiarios = this.lstBeneficiarios.filter(beneficiario => beneficiario.rut !== rut);
    return this.lstBeneficiarios;
  }
}
