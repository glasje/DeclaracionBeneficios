import { Injectable, Output, EventEmitter } from '@angular/core';
import { Beneficiario } from '../models/beneficiario';
import { DeclaracionbeneficiosComponent } from '../components/declaracionbeneficios/declaracionbeneficios.component';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {
  lstBeneficiarios: Beneficiario[];
  beneficiario: Beneficiario;
  porcentajeAcumulado : number;
  constructor( ) { 
    this.beneficiario = new Beneficiario();
    this.lstBeneficiarios=[];
    this.porcentajeAcumulado=0;
  }

  ObtenerBeneficiarios(): Beneficiario[]{

    return this.lstBeneficiarios;
  }

  AgregarBeneficiario(beneficiario): Beneficiario[]{
    this.lstBeneficiarios.push(beneficiario);

    return this.lstBeneficiarios;
  }

  EliminarBeneficiario(beneficiario): Beneficiario[]{
    let rut = beneficiario.rut;

    this.lstBeneficiarios= this.lstBeneficiarios.filter(beneficiario=>beneficiario.rut!==rut);
    return this.lstBeneficiarios;
  }
}
