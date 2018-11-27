import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RutValidator, ParcialValidator } from 'src/app/validators';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { element } from '@angular/core/src/render3/instructions';
import { Propietario } from 'src/app/models/propietario';
import { RutPipe } from 'ng2-rut';
import { Declarante } from 'src/app/models/declarante';
import { from } from 'rxjs';
import { core } from '@angular/compiler';

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
  declarante: Declarante;
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
    this.declarante = new Declarante();
  }

  ngOnInit() {
    this.ObtenerPropietario();
    this.empresa = this._beneficiarioService.empresa;
    this.empresa.rut = this.empresa.rut + this.empresa.dv; 
    this.declarante.rutCompleto =this.empresa.declarante.rut + this.empresa.declarante.dv;
    this.declarante.nombre = this.empresa.declarante.nombre;
    this.declarante.apellido = this.empresa.declarante.apellidos;
    this.declarante.correo=this.empresa.declarante.email;
    this.declarante.relacionEmpresa=this.empresa.declarante.relacion;
    this.form.setValue({
      rut : this.declarante.rutCompleto,
      nombre : this.declarante.nombre,
      apellido :this.declarante.apellido,
      relacionEmpresa :this.declarante.relacionEmpresa,
      correo :this.declarante.correo
    })

  }
  public checkIsValid(field: string) {
    return (this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched));
  }

  public checkIsValidA(field: string) {
    return (this.formAgregar.get(field).invalid && (this.formAgregar.get(field).dirty || this.formAgregar.get(field).touched));
  }

  formSubmit() {

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
  ObtenerPropietario() {
    let dataAux;
    this._beneficiarioService.ObtenerPropietario(this.empresa).subscribe(
      (data) => {
    
        dataAux = data;
        this.lstPropietario = dataAux.data;

        this.lstPropietario.forEach(element => {
          element.rutCompleto = element.rut + element.dv;
          element.participacionString=element.participacion.toString().replace('.',',');
        });
  
        this.CalcularPorcentaje();
      },
      (error) => {
        this.lstPropietario = [];
      }
    )
  }

  GuardarPropietario() {
    let lst = this._beneficiarioService.lstBeneficiarios;
    let porcentaje = 0;
    let suma = 0;
    this.CalcularPorcentaje();
    porcentaje = this.formAgregar.get('participacion').value.replace(',','.');
    suma = this.porcentajeAcumulado + parseFloat(porcentaje.toString());
 
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
      let rut = rutPipe.transform(this.formAgregar.get('rutAgregado').value).replace('-', '');
      let dv = rut.substring(rut.length - 2, rut.length - 1).replace('.', '').replace('.', '');
      rut = rut.substring(0, rut.length - 1).replace('.', '').replace('.', '');
    
      this.propietario.ideDecla =  this.empresa.ideDecla;
      this.propietario.rut = rut;
      this.propietario.dv = dv
      this.propietario.nombre = this.formAgregar.get('nombreAgregar').value;
      this.propietario.apellidos = this.formAgregar.get('apellidoAgregar').value;
      this.propietario.participacion =parseFloat(this.formAgregar.get('participacion').value.replace(',','.')) ;
      this.propietario.participacionString = this.formAgregar.get('participacion').value;
 
      this._beneficiarioService.GuardarPropietario(this.propietario).subscribe(
        (data) => {
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
    if (this.lstPropietario.length > 0) {
      this.lstPropietario.forEach(element => {
        let valor = element.participacion.toString();
        suma = suma + parseFloat(valor);
      });
    }
    this.porcentajeAcumulado = suma;
    this._beneficiarioService.porcentajeAcumulado = this.porcentajeAcumulado;

    return this.porcentajeAcumulado;
  }
  EditarPropietario(beneficiario) {
    let propietarioEdit = new Propietario();
    this.editar = true;
    let rut = beneficiario.rut + beneficiario.dv;
    let parcial = beneficiario.participacionString;
    let nombre 
    propietarioEdit.rutCompleto = rut;
    propietarioEdit.nombre = beneficiario.nombre;
    propietarioEdit.apellidos = beneficiario.apellidos;
    propietarioEdit.participacion = beneficiario.participacion;
 
    this.formEditar.setValue({
      rutEditar: propietarioEdit.rutCompleto,
      participacionEditar:parcial,
      nombreEditar: propietarioEdit.nombre,
      apellidoEditar: propietarioEdit.apellidos
    })
   
  }

  ModificarBeneficiario() {
    let porcentaje = 0;
    let suma = 0;
    this.CalcularPorcentaje();
    porcentaje = this.formEditar.get('participacionEditar').value;
    suma = this.porcentajeAcumulado + parseFloat(porcentaje.toString());
    if (suma > 100) {
      return this.formEditar.controls['participacionEditar'].setErrors({ 'InvalidSuperior': true });
    }
    if (this.formEditar.valid) {
      this.propietario = new Propietario();
      const rutPipe = new RutPipe();
      let rut = rutPipe.transform(this.formEditar.get('rutEditar').value).replace('-', '');
      let dv = rut.substring(rut.length - 2, rut.length - 1).replace('.', '').replace('.', '');
      rut = rut.substring(0, rut.length - 1).replace('.', '').replace('.', '');

      this.propietario.ideDecla = this.empresa.ideDecla;
      this.propietario.rut = rut;
      this.propietario.dv = dv
      this.propietario.nombre = this.formEditar.get('nombreEditar').value;
      this.propietario.apellidos = this.formEditar.get('apellidoEditar').value;
      this.propietario.participacion =parseFloat(this.formEditar.get('participacionEditar').value.replace(',','.')) ;
      this.propietario.participacionString = this.formEditar.get('participacionEditar').value;
     
      this._beneficiarioService.GuardarPropietario(this.propietario).subscribe(
        (data) => {
          this.ObtenerPropietario();
          this.formEditar.reset();
          document.getElementById('btnEditar').click();
        },
        (error) => {
          console.log('error', error);
        }
      );
    } else {
      Object.keys(this.formEditar.controls).forEach(key => {
        this.formEditar.get(key).markAsTouched();
      });
    }
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
