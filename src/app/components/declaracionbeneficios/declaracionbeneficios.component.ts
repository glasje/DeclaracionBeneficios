import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RutValidator, ParcialValidator } from 'src/app/validators';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { element } from '@angular/core/src/render3/instructions';
import { Propietario } from 'src/app/models/propietario';
import { RutPipe } from 'ng2-rut';

@Component({
  selector: 'app-declaracionbeneficios',
  templateUrl: './declaracionbeneficios.component.html',
  styleUrls: ['./declaracionbeneficios.component.css']
})
export class DeclaracionbeneficiosComponent implements OnInit {

  public loading: boolean;
  public form: FormGroup;
  formPassword: FormGroup;
  lstPropietario: Propietario[];
  formAgregar: FormGroup;
  propietario: Propietario;
  validacion: boolean;
  porcentajeAcumulado: number;
  existsProcess: boolean;
  FechaActual: Date;
  editar: boolean;
  formEditar: FormGroup;
  empresa: any;
  constructor(private _beneficiarioService: BeneficiarioService,
    private modalService: ModalService) {
    //Form declaracion de beneficios
    this.form = new FormGroup({
      rut: new FormControl(null, {
        validators: [Validators.required, RutValidator.checkRut, RutValidator.Natural],
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
        validators: [Validators.required, ParcialValidator.Correcto]
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
    //Form editar beneficiario
    this.formEditar = new FormGroup({
      rutEditar: new FormControl(null),
      participacionEditar: new FormControl(null, {
        validators: [Validators.required, ParcialValidator.Correcto]
      }),
      nombreEditar: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      apellidoEditar: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      })
    });
    this.lstPropietario = [];
    this.validacion = true;
    this.porcentajeAcumulado = 0;
    this.editar = false;
  }

  ngOnInit() {
    this.ObtenerPropietario();
    this.empresa= this._beneficiarioService.empresa;
    this.empresa.rut =  this.empresa.rut+this.empresa.dv; 
  }
  public checkIsValid(field: string) {
    return (this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched));
  }

  public checkIsValidA(field: string) {
    return (this.formAgregar.get(field).invalid && (this.formAgregar.get(field).dirty || this.formAgregar.get(field).touched));
  }

  formSubmit() {
    console.log('form')
    if (this.form.valid) {
      this.loading = true;
      setTimeout(() => {
        this.FechaActual = new Date();
        this.existsProcess = true
      }, 2000);

    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).markAsTouched();
      });
    }
  }
  ObtenerPropietario(){
    let dataAux;
    this._beneficiarioService.ObtenerPropietario(this.empresa).subscribe(
      (data) => {
        console.log('data', data);
        dataAux=data;
       this.lstPropietario=dataAux.data;
       console.log('lst',this.lstPropietario);
      },
      (error) => {
        this.lstPropietario=[];
        console.log('error', error);
      }
    )
  }

  GuardarPropietario() {
    let lst = this._beneficiarioService.lstBeneficiarios;
    let porcentaje = 0;
    let suma = 0;

    porcentaje = this.formAgregar.get('participacion').value;
    suma = this.porcentajeAcumulado + parseFloat(porcentaje.toString().replace(",", "."));
    lst.forEach(element => {
      if (element.rut === this.formAgregar.get('rutAgregado').value) {
        this.validacion = this.formAgregar.invalid;
        return this.formAgregar.controls['rutAgregado'].setErrors({ 'Repetido': true });
      }
    })
    if (suma > 100) {
      return this.formAgregar.controls['participacion'].setErrors({ 'InvalidSuperior': true });
    }

    if (this.formAgregar.valid) {

      this.propietario = new Propietario();
      const rutPipe = new RutPipe();    
      let rut = rutPipe.transform(this.formAgregar.get('rutAgregado').value).replace('-',''); 
      let dv =rut.substring(rut.length-2,rut.length-1).replace('.','').replace('.',''); 
      rut = rut.substring(0,rut.length-1).replace('.','').replace('.','');   
      console.log('retu',rut,'dv',dv);

      this.propietario.rut = rut;
      this.propietario.dv=dv
      this.propietario.nombre = this.formAgregar.get('nombreAgregar').value;
      this.propietario.apellido = this.formAgregar.get('apellidoAgregar').value;
      this.propietario.participacion = this.formAgregar.get('participacion').value;
      console.log('parti',this.propietario);
      this._beneficiarioService.GuardarPropietario(this.propietario).subscribe(
        (data) => {
          console.log('data', data);
          this.ObtenerPropietario();
          this.formAgregar.reset();
        },
        (error) => {
          console.log('error', error);
        }
      );


    } else {
      Object.keys(this.formAgregar.controls).forEach(key => {
        this.formAgregar.get(key).markAsTouched();
      });
    }
  }
  Cambiar() {
    this.editar = false;
  }
  CalcularPorcentaje() {
    let suma: number;
    suma = 0;
    console.log(this.lstPropietario);
    if (this.lstPropietario.length > 0) {
      this.lstPropietario.forEach(element => {
        console.log('for', element.participacion);
        let valor = element.participacion.toString().replace(",", ".")
        suma = suma + parseFloat(valor);
      });
    }
    this.porcentajeAcumulado = suma;
    this._beneficiarioService.porcentajeAcumulado = this.porcentajeAcumulado;
    return this.porcentajeAcumulado;
  }
  EditarPropietario(beneficiario) {
    this.editar = true;
    console.log('bene',beneficiario);
    let rut = beneficiario.rutPropietario+beneficiario.dvPropietario;
console.log('tur',rut)
    this.formEditar.controls['rutEditar'].setValue('jyghgjjh');
    this.formEditar.controls['nombreEditar'].setValue('gdfgffdf');
    this.formEditar.controls['apellidoEditar'].setValue(beneficiario.apellidoPropietario);
    this.formEditar.controls['participacionEditar'].setValue(beneficiario.participacion);
  }

  ModificarBeneficiario() {
    let rut = this.formEditar.get('rutEditar').value

    this.lstPropietario.forEach(element => {
      if (rut === element.rut) {
        element.nombre = this.formEditar.get('nombreEditar').value;
        element.apellido = this.formEditar.get('apellidoEditar').value;
        element.participacion = this.formEditar.get('participacionEditar').value;
        document.getElementById('btnEditar').click();

      }
    })
  }

  EliminarBeneficiario(beneficiario) {
    let id = document.getElementById('modal');
    id.style.display = 'block'
    this.modalService.init(ModalComponent,
      {
        'message': 'Está seguro que desea eliminar a ' + beneficiario.nombre,
        'okMessage': 'Si',
        'cancelMessage': 'No'
      }, {});

    this.modalService.okEvent.subscribe(data => {
      if (data === true) {
        this._beneficiarioService.EliminarBeneficiario(beneficiario);
        this.ObtenerPropietario();
      }
    });
    this.modalService.cancelEvent.subscribe(data => {
      if (data === true) {
        return;
      }
    });

  }
}
