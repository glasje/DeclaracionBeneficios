import { Component, OnInit, Directive } from '@angular/core';
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
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { Empresa } from 'src/app/models/empresa';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-declaracionbeneficios',
  templateUrl: './declaracionbeneficios.component.html',
  styleUrls: ['./declaracionbeneficios.component.css']
})
export class DeclaracionbeneficiosComponent implements OnInit {
  //Flag que indica si se debe mostrar/ocultar el spinner de carga
  private loading: boolean;
  //Formulario de declaracion de beneficios
  private form: FormGroup;
  //formulario de password
  private formPassword: FormGroup;
  //Lista de propietarios
  private lstPropietario: Propietario[];
  //Formulario que almacena los datos para agregar propietarios
  private formAgregar: FormGroup;
  //Entidad Propietario
  private propietario: Propietario;
  //Flag que indica si esta validado el formulario
  public validacion: boolean;
  //Total de % de participacion
  private porcentajeAcumulado: number;
  //
  public existsProcess: boolean;
  //Variable que almacena la fecha actual
  public FechaActual: Date;
  //Flag que indica si se esta Editando un propietario
  public editar: boolean;
  //Formulario que almacena los datos a editar de un propietario
  private formEditar: FormGroup;
  //Entidad Empresa
  private empresa: any;
  //Entidad Declarante
  private declarante: Declarante;

  eliminar: boolean = false;
  /**
   * Constructor que inicia los Servicios y formularios
   * @param _beneficiarioService 
   * @param modalService 
   */
  constructor(
    private _beneficiarioService: BeneficiarioService,
    private modalService: ModalService,
    private _tokenService: TokenJwtService,
    private _router: Router
  ) {
    this.empresa = new Empresa();


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
        validators: [Validators.required, RutValidator.checkRut, RutValidator.Natural],
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
  /**
   * 
   */
  ngOnInit() {
    /*   this.empresa = this._beneficiarioService.empresa;
      let idDecla = this._tokenService.GetIdDecla();
      let idEmp = this._tokenService.GetIdEmp();
      this.empresa.rut = this.empresa.rut + this.empresa.dv;
      this.empresa.ideDecla = idDecla;
      this.empresa.ideEmp = idEmp; */
    this.ObtenerPropietario();

    if (this.empresa.declarante) {
      this.declarante.rutCompleto = this.empresa.declarante.rut + this.empresa.declarante.dv;
      this.declarante.nombre = this.empresa.declarante.nombre;
      this.declarante.apellido = this.empresa.declarante.apellidos;
      this.declarante.nombreCompleto = this.declarante.nombre + ' ' + this.declarante.apellido;
      this.declarante.correo = this.empresa.declarante.email;
      this.declarante.relacionEmpresa = this.empresa.declarante.relacion;

      this.form.setValue({
        rut: this.declarante.rutCompleto,
        nombre: this.declarante.nombre,
        apellido: this.declarante.apellido,
        relacionEmpresa: this.declarante.relacionEmpresa,
        correo: this.declarante.correo
      })
    }


  }
  /**
   * 
   * @param field 
   */
  public checkIsValid(field: string) {
    return (this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched));
  }
  /**
   * 
   * @param field 
   */
  public checkIsValidA(field: string) {
    return (this.formAgregar.get(field).invalid && (this.formAgregar.get(field).dirty || this.formAgregar.get(field).touched));
  }
  /**
   * 
   */
  formSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.empresa.declarante;
      let id = this._tokenService.GetIdDecla();
      this.FechaActual = new Date();
      this.declarante = new Declarante();
      this.LlenarDeclarante();
      let declaracionEnviar = {
        "ideDecla": id,
        declarante: {
          "ideDecla": id,
          "rut": this.declarante.rut,
          "dv": this.declarante.dv,
          "nombre": this.declarante.nombre,
          "apellidos": this.declarante.apellido,
          "relacion": this.declarante.relacionEmpresa,
          "email": this.declarante.correo
        }
      };
      this.EnviarDeclaracion(declaracionEnviar);
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).markAsTouched();
      });
    }
  }
  LlenarDeclarante(): any {
    const rutPipe = new RutPipe();
    let rut = rutPipe.transform(this.form.get('rut').value).replace('-', '');
    let dv = rut.substring(rut.length - 1, rut.length).replace('.', '').replace('.', '');
    rut = rut.substring(0, rut.length - 1).replace('.', '').replace('.', '');

    this.declarante.rut = rut;
    this.declarante.dv = dv;
    this.declarante.nombre = this.form.get('nombre').value;
    this.declarante.nombreCompleto = this.declarante.nombre + ' ' + this.declarante.apellido;
    this.declarante.apellido = this.form.get('apellido').value;
    this.declarante.relacionEmpresa = this.form.get('relacionEmpresa').value;
    this.declarante.correo = this.form.get('correo').value;

  }
  /**
   * Metodo que obtiene los propietarios del declarante.
   */
  ObtenerPropietario() {
    let dataAux;
    let ideDecla = this._tokenService.GetIdDecla();
    this._beneficiarioService.ObtenerPropietario(ideDecla).subscribe(
      (data) => {
        if (data.status === 401) {
          this._router.navigate(['/'])
        } else {


          dataAux = data;
          this.lstPropietario = dataAux.data;

          this.lstPropietario.forEach(element => {

            element.rutCompleto = element.rut + element.dv;
            element.participacionString = element.participacion.toString().replace('.', ',');
          });

          this.CalcularPorcentaje();
        }

      },
      (error) => {

        this.lstPropietario = [];
      }
    )
  }
  /**
   * Metodo agrega un propietario
   */
  GuardarPropietario() {
    let lst = this._beneficiarioService.lstBeneficiarios;
    let porcentaje = 0;
    let suma = 0;
    this.CalcularPorcentaje();
    porcentaje = this.formAgregar.get('participacion').value.replace(',', '.');
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
      let dv = rut.substring(rut.length - 1, rut.length).replace('.', '').replace('.', '');
      rut = rut.substring(0, rut.length - 1).replace('.', '').replace('.', '');

      this.propietario.ideDecla = this.empresa.ideDecla;
      this.propietario.rut = rut;
      this.propietario.dv = dv
      this.propietario.nombre = this.formAgregar.get('nombreAgregar').value;
      this.propietario.apellidos = this.formAgregar.get('apellidoAgregar').value;
      this.propietario.participacion = parseFloat(this.formAgregar.get('participacion').value.replace(',', '.'));
      this.propietario.participacionString = this.formAgregar.get('participacion').value;
      this.propietario.ideDecla = parseInt(this._tokenService.GetIdDecla());
  
      this._beneficiarioService.GuardarPropietario(this.propietario).subscribe(
        (data) => {
          this.ObtenerPropietario();
          document.getElementById('btnAgregar').click();
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
  /**
   * Metodo que cambia el Flag para indicar si se esta editando o no.
   */
  Cambiar() {
    this.editar = false;
  }
  /**
   * Metodo que calcula el porcentaje total de participacion entre los propietrios.
   */
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
  /**
   * Metodo que edita los datos actuales de un propietario
   * @param beneficiario 
   */
  EditarPropietario(beneficiario) {
    let propietarioEdit = new Propietario();
    this.editar = true;
    let rut = beneficiario.rut + beneficiario.dv;
    let parcial = beneficiario.participacion;
    propietarioEdit.rutCompleto = rut;
    propietarioEdit.nombre = beneficiario.nombre;
    propietarioEdit.apellidos = beneficiario.apellidos;
    propietarioEdit.participacion = beneficiario.participacion;
    this.porcentajeAcumulado = this.porcentajeAcumulado - parseFloat(beneficiario.participacion.toString())
    this.formEditar.setValue({
      rutEditar: propietarioEdit.rutCompleto,
      participacionEditar: parcial,
      nombreEditar: propietarioEdit.nombre,
      apellidoEditar: propietarioEdit.apellidos
    })

  }
  /**
   * Metodo que envia los datos del propietario a editar a un servicio.
   */
  ModificarBeneficiario() {
    let porcentaje = 0;
    let suma = 0;

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

      this.propietario.ideDecla = parseInt(this._tokenService.GetIdDecla());
      this.propietario.rut = rut;
      this.propietario.dv = dv
      this.propietario.nombre = this.formEditar.get('nombreEditar').value;
      this.propietario.apellidos = this.formEditar.get('apellidoEditar').value;
      this.propietario.participacion = parseFloat(this.formEditar.get('participacionEditar').value.replace(',', '.'));
      this.propietario.participacionString = this.formEditar.get('participacionEditar').value;

      this._beneficiarioService.GuardarPropietario(this.propietario).subscribe(
        (data) => {
          this.ObtenerPropietario();
          this.formEditar.reset();
          document.getElementById('btnEditar').click();
          this.CalcularPorcentaje();
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
  /**
   * Metodo que elimina a un propietario.
   * @param beneficiario 
   */
  EliminarBeneficiario(beneficiario) {
    this.eliminar = true;
    let id = document.getElementById('modal');
    id.style.display = 'block'
    this.modalService.init(ModalComponent,
      {
        'message': 'Está seguro que desea eliminar a ' + beneficiario.nombre,
        'okMessage': 'Si',
        'cancelMessage': 'No'
      }, {});

    this.modalService.okEvent.subscribe(data => {
      if (data === true && this.eliminar) {
        this._beneficiarioService.EliminarBeneficiario(beneficiario.idProp).subscribe(
          result => {

            this.ObtenerPropietario();
          },
          error => {
            console.log(error);
          }
        );

      }
    });
    this.modalService.cancelEvent.subscribe(data => {
      if (data === true) {
        return;
      }
    });

  }

  EnviarDeclaracion(declaracionEnviar) {
    this.eliminar = false;
    let id = document.getElementById('modal');
    id.style.display = 'block'
    this.modalService.init(ModalComponent,
      {
        'message': 'Está seguro que desea enviar la declaración',
        'okMessage': 'Si',
        'cancelMessage': 'No'
      }, {});

    this.modalService.okEvent.subscribe(data => {
      if (data === true && !this.eliminar) {
        this._beneficiarioService.EnviarDeclaracion(declaracionEnviar).subscribe(
          data => {
            this._beneficiarioService.declarante = declaracionEnviar;
            this.existsProcess = true;
            this.loading = false;
            this._router.navigate(['/declaracionEnviada'])
          },
          error => {
            this.loading = false;
          }
        );

      }
    });
    this.modalService.cancelEvent.subscribe(data => {
      if (data === true) {
        this.loading = false;
        return;
      }
    });

  }
}

