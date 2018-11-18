import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RutValidator } from 'src/app/validators';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { Beneficiario } from 'src/app/models/beneficiario';

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

  constructor(private _beneficiarioService : BeneficiarioService ) {
    //Form declaracion de beneficios
    this.form = new FormGroup({
      rut: new FormControl(null, {
        validators: [Validators.required, RutValidator.checkRut,RutValidator.Natural]
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
        validators: [Validators.required,Validators.email],
        updateOn: 'blur'
      })
    });
    this.lstBeneficiarios=[];
  }

  ngOnInit() {
    //this.lstBeneficiarios= this._beneficiarioService.ObtenerBeneficiarios();
    if(this._beneficiarioService.change){
      this.ObtenerBeneficiarios();
    };
  }
  public checkIsValid(field: string) {
    return (this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched));
  }

  formSubmit() {
    if (this.form.valid) {
      console.log('aqui')
    }else{
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).markAsTouched();
      });
    }
  }
  ObtenerBeneficiarios(): Beneficiario[]{
    this.lstBeneficiarios=this._beneficiarioService.ObtenerBeneficiarios();
    return this.lstBeneficiarios;
  }
}
