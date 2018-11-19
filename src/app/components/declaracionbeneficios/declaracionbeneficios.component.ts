import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RutValidator, ParcialValidator} from 'src/app/validators';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { Beneficiario } from 'src/app/models/beneficiario';
import swal from 'sweetalert2'
@Component({
  selector: 'app-declaracionbeneficios',
  templateUrl: './declaracionbeneficios.component.html',
  styleUrls: ['./declaracionbeneficios.component.css']
})
export class DeclaracionbeneficiosComponent implements OnInit {

  public loading: boolean;
  public form: FormGroup;
  formPassword: FormGroup;
  lstBeneficiarios: Beneficiario[];
  formAgregar: FormGroup;
  beneficiario: Beneficiario;
  validacion: boolean;
  porcentajeAcumulado : number;
  existsProcess: boolean;
  FechaActual: Date;
  constructor(private _beneficiarioService: BeneficiarioService) {
    //Form declaracion de beneficios
    this.form = new FormGroup({
      rut: new FormControl(null, {
        validators: [Validators.required, RutValidator.checkRut, RutValidator.Natural]
      }),
      nombre: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      apellido: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      relacionEmpresa: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      correo: new FormControl(null, {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
      })
    });

    //Form agregar beneficiario
    this.formAgregar = new FormGroup({
      rutAgregado: new FormControl(null, {
        validators: [Validators.required, RutValidator.checkRut, RutValidator.Natural],
        updateOn: 'blur'
      }),
      participacion: new FormControl(null, {
        validators: [Validators.required,ParcialValidator.Correcto]
      }), 
      nombreAgregar: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      apellidoAgregar: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      })

    });
    this.lstBeneficiarios = [];
    this.validacion = true;
    this.porcentajeAcumulado=0;
  }

  ngOnInit() {
    //this.lstBeneficiarios= this._beneficiarioService.ObtenerBeneficiarios();
  }
  public checkIsValid(field: string) {
    return (this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched));
  }
  public Evaluar(field: string){
    
      
  }
  public checkIsValidA(field: string) {
    /* if(field==='participacion'){
      if(this.formAgregar.get(field).value!= null){
        let input =this.formAgregar.get(field).value.replace(",",".");
        console.log('input',input);
        console.log('proce',this.porcentajeAcumulado);
        let suma = this.porcentajeAcumulado+parseFloat(input);
         if(suma<100){
          return this.formAgregar.controls[field].setErrors(null);
         }else{
          return this.formAgregar.controls[field].setErrors({'InvalidPorcentaje':true});
          
         }
      }else{
        return this.formAgregar.controls[field].setErrors(null);
      }
    } */
    return (this.formAgregar.get(field).invalid && (this.formAgregar.get(field).dirty || this.formAgregar.get(field).touched));
  }

  formSubmit() {
    console.log('form')
    if (this.form.valid) {
      this.loading=true; 
      setTimeout(() => {
        this.FechaActual= new Date();
        this.existsProcess =true
      }, 2000);
      
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).markAsTouched();
      });
    }
  }
  ObtenerBeneficiarios(): Beneficiario[] {
    this.lstBeneficiarios = this._beneficiarioService.ObtenerBeneficiarios();
    this.CalcularPorcentaje();
    return this.lstBeneficiarios;
  }

  AgregarParticipante() {
    let lst = this._beneficiarioService.lstBeneficiarios;
    let porcentaje =0;
    let suma =0;

    
    porcentaje = this.formAgregar.get('participacion').value;
    suma = this.porcentajeAcumulado + parseFloat(porcentaje.toString().replace(",","."));
    lst.forEach(element => {
      if (element.rut === this.formAgregar.get('rutAgregado').value) {
        this.validacion = this.formAgregar.invalid;
        return this.formAgregar.controls['rutAgregado'].setErrors({'Repetido':true});
      }
    })  
    if(suma>100){
      return this.formAgregar.controls['participacion'].setErrors({'InvalidSuperior':true});
    }
   
      if (this.formAgregar.valid) {
        this.beneficiario = new Beneficiario();

        this.beneficiario.rut = this.formAgregar.get('rutAgregado').value;
        this.beneficiario.nombre = this.formAgregar.get('nombreAgregar').value;
        this.beneficiario.apellido = this.formAgregar.get('apellidoAgregar').value;
        this.beneficiario.participacion = this.formAgregar.get('participacion').value;
        this._beneficiarioService.AgregarBeneficiario(this.beneficiario);
        this.ObtenerBeneficiarios();
        /* this.formAgregar.reset(); */
        

      } else {
        Object.keys(this.formAgregar.controls).forEach(key => {
          this.formAgregar.get(key).markAsTouched();
        });
      }
  }

  CalcularPorcentaje(){
    let suma: number;
    suma=0;
    console.log(this.lstBeneficiarios);
    if(this.lstBeneficiarios.length>0){
      this.lstBeneficiarios.forEach(element => {
        console.log('for',element.participacion);
        let valor = element.participacion.toString().replace(",",".")
        suma= suma+parseFloat(valor);
      });
    }
    this.porcentajeAcumulado=suma;
    this._beneficiarioService.porcentajeAcumulado=this.porcentajeAcumulado;
    return this.porcentajeAcumulado;
  }

  EliminarBeneficiario(beneficiario) {
    swal({
      title: 'Confirmar eliminación',
      text: "¿Desea eliminar al beneficiario?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        swal(
          'Beneficiario eliminado',
          'se ha eliminado correctamente',
          'success'
        )

        this._beneficiarioService.EliminarBeneficiario(beneficiario);
        this.ObtenerBeneficiarios();

      }
    })

  }
}
