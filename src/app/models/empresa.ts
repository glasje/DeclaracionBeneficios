/**
 * Model Empresa
 */
export class Empresa {
   /**
    * id declarante
    */
   id: number;
   ideEmp: number;
   /**
    * Rut Empresa
    */
   rut: string;

   /**
      * Dv Empresa
      */
   dv: string;

   clave : string;
   /**
    * Razon Social
    */
   razonSocial: string;

   estado: string;

   vigencia: any;

   feCreacion: Date;

   feModificacion: Date;

   declaracion : any[];
  ideDecla: any;
  declarante: any;
   
}
