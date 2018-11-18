import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RutValidator } from 'src/app/validators';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { Beneficiario } from 'src/app/models/beneficiario';
@Component({
  selector: 'app-modal-agregarpropietario',
  templateUrl: './modal-agregarpropietario.component.html',
  styleUrls: ['./modal-agregarpropietario.component.css']
})
export class ModalAgregarpropietarioComponent implements OnInit {

  public formAgregar: FormGroup;
  formPassword: FormGroup;
  beneficiario : Beneficiario;
  constructor(private _beneficiarioService : BeneficiarioService) { 
    //Form agregar beneficiario
    this.formAgregar = new FormGroup({
      rutAgregado: new FormControl(null, {
        validators: [Validators.required, RutValidator.checkRut,RutValidator.Natural],
        updateOn:'blur'
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

    //instancia beneficiario
    this.beneficiario = new Beneficiario();
  }
  ngOnInit() {
  }

  public checkIsValid(field: string) {
    return (this.formAgregar.get(field).invalid && (this.formAgregar.get(field).dirty || this.formAgregar.get(field).touched));
  }
  AgregarParticipante(){
    if (this.formAgregar.valid) {
      console.log('aqui');
      this.beneficiario.rut= this.formAgregar.get('rutAgregado').value;
      this.beneficiario.nombre= this.formAgregar.get('nombreAgregar').value;
      this.beneficiario.apellido= this.formAgregar.get('apellidoAgregar').value;
      this.beneficiario.participacion= this.formAgregar.get('participacion').value;
      this._beneficiarioService.AgregarBeneficiario(this.beneficiario);
    }else{
      Object.keys(this.formAgregar.controls).forEach(key => {
        this.formAgregar.get(key).markAsTouched();
      });
    }
  }
}
