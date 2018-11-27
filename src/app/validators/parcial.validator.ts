import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

/**
 * Validador de rut.
 */
export class ParcialValidator {

  constructor() {

  }
  /**
   * Valida un rut.
   * @param control Objecto que contiene los datos a validar.
   */
  static Correcto(control: FormControl): any {
    let numerico = control.value;
    let cadena = "";

    if (numerico) {
      cadena = numerico.toString();
      cadena = cadena.replace('.', ',');
      
      if (parseInt(cadena) < 101) {

        return null;
      } else {
        return {
          'InvalidPorcentaje': true
        };
      }
    }
  }
}

