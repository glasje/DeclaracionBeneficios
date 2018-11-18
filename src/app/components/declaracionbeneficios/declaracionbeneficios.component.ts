import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RutValidator } from 'src/app/validators';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { Beneficiario } from 'src/app/models/beneficiario';
import swal from 'sweetalert2'
@Component({
  selector: 'app-declaracionbeneficios',
  templateUrl: './declaracionbeneficios.component.html',
  styleUrls: ['./declaracionbeneficios.component.css']
})
export class DeclaracionbeneficiosComponent implements OnInit {

  public loading: boolean = false;
  public form: FormGroup;
  formPassword: FormGroup;
  lstBeneficiarios: Beneficiario[];
  formAgregar: FormGroup;
  beneficiario: Beneficiario;
  validacion: boolean;

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
        validators: [Validators.required],
        updateOn: 'blur'
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
  }

  ngOnInit() {
    //this.lstBeneficiarios= this._beneficiarioService.ObtenerBeneficiarios();
    if (this._beneficiarioService.change) {
      this.ObtenerBeneficiarios();
    };
  }
  public checkIsValid(field: string) {
    return (this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched));
  }

  public checkIsValidA(field: string) {
    return (this.formAgregar.get(field).invalid && (this.formAgregar.get(field).dirty || this.formAgregar.get(field).touched));
  }

  formSubmit() {
    if (this.form.valid) {
      console.log('aqui')
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).markAsTouched();
      });
    }
  }
  ObtenerBeneficiarios(): Beneficiario[] {
    this.lstBeneficiarios = this._beneficiarioService.ObtenerBeneficiarios();
    return this.lstBeneficiarios;
  }

  AgregarParticipante() {
    let lst = this._beneficiarioService.lstBeneficiarios;
    this.validacion = true;
    lst.forEach(element => {
      if (element.rut === this.formAgregar.get('rutAgregado').value) {
        console.log('reee');
        this.validacion = this.formAgregar.invalid;
      }
    })
    if (this.validacion) {
      if (this.formAgregar.valid) {
        this.beneficiario = new Beneficiario();

        this.beneficiario.rut = this.formAgregar.get('rutAgregado').value;
        this.beneficiario.nombre = this.formAgregar.get('nombreAgregar').value;
        this.beneficiario.apellido = this.formAgregar.get('apellidoAgregar').value;
        this.beneficiario.participacion = this.formAgregar.get('participacion').value;
        this._beneficiarioService.AgregarBeneficiario(this.beneficiario);
        this.formAgregar.reset();


      } else {
        Object.keys(this.formAgregar.controls).forEach(key => {
          this.formAgregar.get(key).markAsTouched();
        });
      }
    }

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
          'se a eliminado correctamente',
          'success'
        )
        console.log('bene', beneficiario);
        this._beneficiarioService.EliminarBeneficiario(beneficiario);
        this.ObtenerBeneficiarios();
      }
    })

  }
}
