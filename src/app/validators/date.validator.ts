import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';
/**
 * Validador de fecha.
 */
export class DateValidator {

  /**
   * Valida que la fecha ingresada es superior a la fecha mínima indicada
   * @param minDateStr Fecha mínima a validar.
   */
  static minDate(minDateStr: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const minDateArr = this.splitDate(minDateStr);
      const minDate = new Date(minDateArr.year, minDateArr.month, minDateArr.day);
      if (isNullOrUndefined(control.value)) {
        return null;
      }
      const dateArr = this.splitDate(control.value);
      const date = new Date(dateArr.year, dateArr.month, dateArr.day);
      const today = new Date();
      let failed = true;
      if (date >= minDate) {
        failed = false;
      }
      return failed ? { 'minDate': { value: control.value } } : null;
    };
  }

  /**
   * Valida que la fecha de nacimiento ingresada en el formulario está dentro
   * del rango etareo apto para no superar la edad máxima indicada.
   * @param maxAge Edad máxima.
   */
  static validateMaxAge(maxAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isNullOrUndefined(control.value)) {
        return null;
      }
      const birthdateArr = this.splitDate(control.value);
      const birthdate = new Date(birthdateArr.year, birthdateArr.month, birthdateArr.day);
      const maxDate = new Date(birthdateArr.year + maxAge, birthdateArr.month, birthdateArr.day);
      const today = new Date();
      let failed = true;
      if (maxDate > today) {
        failed = false;
      }
      return failed ? { 'maxAge': { value: control.value } } : null;
    };
  }

  /**
   * Valida que la fecha ingresada es válida (ej: 30-02-1990 no es válida)
   */
  static validateDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isNullOrUndefined(control.value)) {
        return null;
      }
      const dateArr = this.splitDate(control.value);
      const date = new Date(dateArr.year, dateArr.month, dateArr.day);
      const isValidDate = (Boolean(+date) && date.getDate() === dateArr.day);
      let failed = true;
      if (isValidDate) {
        failed = false;
      }
      return failed ? { 'invalidDate': { value: control.value } } : null;
    };
  }

  /**
   * Valida que la fecha ingresada es menor a la de hoy.
   */
  static lessThanToday(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isNullOrUndefined(control.value)) {
        return null;
      }
      const dateArr = this.splitDate(control.value);
      const date = new Date(dateArr.year, dateArr.month, dateArr.day);
      const isValidDate = (Boolean(+date) && date.getDate() === dateArr.day);
      const today = new Date();
      let failed = true;
      if (date <= today) {
        failed = false;
      }
      return failed ? { 'greaterThanToday': { value: control.value } } : null;
    };
  }

  /**
   * Método privado que convierte una fecha de string a arreglo válido para generar
   * un elemento Date()
   * @param dateStr Fecha en string ('dd-mm-yyyy')
   */
  private static splitDate(dateStr): { day: number, month: number, year: number } {
    const dateObj = { day: null, month: null, year: null };
    dateObj.day = +dateStr.split('-')[0];
    dateObj.month = +dateStr.split('-')[1] - 1;
    dateObj.year = +dateStr.split('-')[2];
    return dateObj;
  }
}
