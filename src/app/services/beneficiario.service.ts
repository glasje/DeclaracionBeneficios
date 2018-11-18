import { Injectable, Output, EventEmitter } from '@angular/core';
import { Beneficiario } from '../models/beneficiario';
import { DeclaracionbeneficiosComponent } from '../components/declaracionbeneficios/declaracionbeneficios.component';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  lstBeneficiarios: Beneficiario[];
  beneficiario: Beneficiario;
  constructor( ) { 
    this.beneficiario = new Beneficiario();
    this.lstBeneficiarios=[];
  }

  ObtenerBeneficiarios(): Beneficiario[]{

    return this.lstBeneficiarios;
  }

  AgregarBeneficiario(beneficiario): Beneficiario[]{
    this.lstBeneficiarios.push(beneficiario);
    this.change.emit(true);
    return this.lstBeneficiarios;
  }

  EliminarBeneficiario(beneficiario): Beneficiario[]{
    let rut = beneficiario.rut;

    this.lstBeneficiarios= this.lstBeneficiarios.filter(beneficiario=>beneficiario.rut!==rut);
    return this.lstBeneficiarios;
  }
}
