import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RutValidator, ParcialValidator} from 'src/app/validators';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { Beneficiario } from 'src/app/models/beneficiario';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { element } from '@angular/core/src/render3/instructions';

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
  editar : boolean;
  constructor(private _beneficiarioService: BeneficiarioService,
    private modalService: ModalService) {
    //Form declaracion de beneficios
    this.form = new FormGroup({
      rut: new FormControl(null, {
        validators: [Validators.required, RutValidator.checkRut,RutValidator.Natural],
        updateOn: 'blur'
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
        validators: [Validators.required, RutValidator.checkRut],
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
    this.editar=false;
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
        if(!this.editar){
          this.beneficiario = new Beneficiario();

          this.beneficiario.rut = this.formAgregar.get('rutAgregado').value;
          this.beneficiario.nombre = this.formAgregar.get('nombreAgregar').value;
          this.beneficiario.apellido = this.formAgregar.get('apellidoAgregar').value;
          this.beneficiario.participacion = this.formAgregar.get('participacion').value;
          this._beneficiarioService.AgregarBeneficiario(this.beneficiario);
          this.ObtenerBeneficiarios();
        }else{
          let rut =this.formAgregar.get('rutAgregado').value
          this.lstBeneficiarios.forEach(element=>{
            if(rut ===element.rut){
              element.nombre=this.formAgregar.get('nombreAgregar').value;
              element.apellido = this.formAgregar.get('apellidoAgregar').value;
              element.participacion = this.formAgregar.get('participacion').value;
            }
          })
        }
        this.formAgregar.reset(); 
        

      } else {
        Object.keys(this.formAgregar.controls).forEach(key => {
          this.formAgregar.get(key).markAsTouched();
        });
      }
  }
  Cambiar(){
    this.editar=false;
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
  EditarBeneficiario(beneficiario){
    this.editar=true;
    this.formAgregar.controls['rutAgregado'].setValue(beneficiario.rut);
    this.formAgregar.controls['nombreAgregar'].setValue(beneficiario.nombre);
    this.formAgregar.controls['apellidoAgregar'].setValue(beneficiario.apellido);
    this.formAgregar.controls['participacion'].setValue(beneficiario.participacion);
  }
  EliminarBeneficiario(beneficiario) {
    let id = document.getElementById('modal');
    id.style.display= 'block'
    this.modalService.init(ModalComponent,
      {
        'message': 'Está seguro que desea eliminar a ' + beneficiario.nombre,
        'okMessage': 'Si',
        'cancelMessage': 'No'
      }, {});

    this.modalService.okEvent.subscribe(data => {
      if (data === true) {
        this._beneficiarioService.EliminarBeneficiario(beneficiario);
        this.ObtenerBeneficiarios();
      }
    });
    this.modalService.cancelEvent.subscribe(data => {
      if (data === true) {
        return;
      }
    });

  }
}
