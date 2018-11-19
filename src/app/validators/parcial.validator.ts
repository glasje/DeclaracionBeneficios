import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

/**
 * Validador de rut.
 */
export class ParcialValidator {

  constructor(){

  }
  /**
   * Valida un rut.
   * @param control Objecto que contiene los datos a validar.
   */
  static Correcto(control: FormControl): any {  

    if(control.value!= null){
      let input =control.value.replace(",",".")
    if (input<101) {
      return null;
    } else {
      return {
        'InvalidPorcentaje': true
      };
    }
  }
}
}
  
