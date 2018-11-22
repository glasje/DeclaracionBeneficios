import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { BeneficiarioService } from '../services/beneficiario.service';
declare function require(name: string);
const rutHelper = require('rut-helpers');

/**
 * Validador de rut.
 */
export class RutValidator {

  constructor(private _beneficiarioService : BeneficiarioService){

  }
  /**
   * Valida un rut.
   * @param control Objecto que contiene los datos a validar.
   */
  static checkRut(control: FormControl): any {  
    
    if (rutHelper.rutValidate(control.value)) {
      return null;
    } else {
      return {
        'invalidRut': true
      };
    }
  }

  /**
   * Compara el valor ingresado con un rut en particular, el cual no
   * puede ingresarse 2 veces.
   * @param rutDv Rut a comparar
   */
  static mainRut(rutDv: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isNullOrUndefined(control.value)) {
        return null;
      }
      let failed = true;
      if (rutDv !== control.value) {
        failed = false;
      }
      return failed ? { 'mainRut': { value: control.value } } : null;
    };
  }
  static Natural(control: FormControl): any {  
    if (rutHelper.rutValidate(control.value)) {
      let rut = control.value;
      rut = rut.toString().substring(0,rut.length-1);
      let rutDv = parseInt(rut);
      if(rutDv>50000000){
        return {'InvalidNatural':true}
      }
      return null;
    } else {
      return {
        'invalidRut': true
      };
    }
  }
}
