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
    let puntoIndex =-1;
    let puntoEliminar =-1;
    let contar =""
   /*  let regex  = /^\d+(?:\.\d{0,2})$/; */
    if (numerico) {
      cadena = numerico.toString();
      puntoIndex= cadena.indexOf('.');
      if(puntoIndex!=-1){
        puntoEliminar = cadena.indexOf('.',puntoIndex+1);
        contar =cadena.substring(puntoIndex+1, cadena.length)
      }
     
      if ((parseFloat(cadena) > 0) && (parseFloat(cadena) < 101) && (puntoEliminar==-1) && (contar.length<3)) {
        return null;
      } else {
        return {
          'InvalidPorcentaje': true
        };
      }
    }
  }
}

