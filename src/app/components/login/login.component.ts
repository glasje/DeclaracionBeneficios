import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RutValidator } from 'src/app/validators';
import { RutPipe } from 'ng2-rut';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { Empresa } from 'src/app/models/empresa';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any;
  formPassword: any;
  loading: boolean;
  error: string;
  isClient: any;
  existsProcess: boolean;
  consultaEmpresa: any;
  mensaje: any;
  empresa: Empresa;
  razonSocial: any;

  constructor(private router: Router,
    private _loginService: LoginService,
    private _beneficiarioService: BeneficiarioService) {
    this.form = new FormGroup({
      rut: new FormControl(null, {
        validators: [Validators.required, RutValidator.checkRut]
      }),
      recaptchaReactive: new FormControl(null, Validators.required)
    });

    this.formPassword = new FormGroup({
      password: new FormControl(null, Validators.required)
    });
    this.empresa = new Empresa();
  }

  ngOnInit() {
  }
  /**
     * Método que retorna si el campo del formulario es válido o no.
     * @param field Campo a validar
     */
  public checkIsValid(field: string) {
    return (this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched));
  }

  formSubmit() {
    if (this.form.valid) {
      this.loading = true;

      let rut = this.form.get('rut').value;
      /*   setTimeout(() => {
          if(rut==='775539003'){
            this.existsProcess=true;
                this.loading = false;
                this.isClient=true;
          }else{
            this.mensaje= 'Rut incorrecto';
                this.loading=false;
                this.form.reset();
          }
        }, 2000); */

      this._loginService.ValidarRut(rut).subscribe(
        data => {
          this.consultaEmpresa = data;
          if (this.consultaEmpresa.data.existe) {
            this.existsProcess = true;
            this.loading = false;
            this.isClient = true;
            this.razonSocial=this.consultaEmpresa.data.razonSocial;
            this.empresa.idEmpresa=this.consultaEmpresa.data.id;
          } else {
            this.mensaje = this.consultaEmpresa.data.mensaje;
            this.loading = false;
            this.form.reset();
          }
        },
        err => {
          console.error(err);
          this.loading = false;
        }
      );
    }
    else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).markAsTouched();
      });
    }
  }

  formPasswordSubmit() {
    //Valida que se ingrese la contraseña o numero de serie 
    if (this.formPassword.valid) {
      this.loading = true;
      this.error = "";
      const rutPipe = new RutPipe();
      let rut = rutPipe.transform(this.form.get('rut').value).replace('-', '');
      rut = rut.substring(0, rut.length - 1).replace('.', '').replace('.', '');
    
      let clave = this.formPassword.get('password').value;
      let consultaEmpresa = {
        rut: rut,
        password: clave
      }

      /*  setTimeout(() => {
        if(clave==='P2ssw0rd'){
          this.router.navigate(['/declaracion']);
          this.loading = false;
        }else{
          this.error='clave incorrecta';
          this.loading = false;
          this.formPassword.reset();
        }
      }, 1000);   */
      this._loginService.ValidarPassword(consultaEmpresa).subscribe(
        data => {
      
          this.consultaEmpresa = data;
        
          if (this.consultaEmpresa.data.empresa.autorizado && 
              this.consultaEmpresa.data.empresa.existe && 
              !this.consultaEmpresa.data.enviado) {
            this.empresa.id= this.consultaEmpresa.data.id;
            this.empresa.rut=this.consultaEmpresa.data.empresa.rut;
            this.empresa.dv = this.consultaEmpresa.data.empresa.dv;
            this.empresa.razonSocial= this.consultaEmpresa.data.empresa.razonSocial;
            this._beneficiarioService.empresa= this.empresa;
            this.router.navigate(['/declaracion']);
            this.loading = false;

          } else if(!this.consultaEmpresa.data.empresa.autorizado){
            this.loading = false;
            this.error = this.consultaEmpresa.data.empresa.mensaje;
          }else if(this.consultaEmpresa.data.enviado){
            this.loading = false;
            this.error = this.consultaEmpresa.data.mensaje;
          }


        }, error => {
          console.log('error', error);
        }
      )

    } else {
      Object.keys(this.formPassword.controls).forEach(key => {
        this.formPassword.get(key).markAsTouched();
      });
    }
  }

  removeValidatorFormPassword(): void {
    if (this.isClient) {
      this.activeControlsValidators(this.formPassword, 'password');
    } else {
      this.activeControlsValidators(this.formPassword, 'numeroSerie');
    }
    this.error = "";
  }

  activeControlsValidators(form: FormGroup, control: string): void {
    form.get(control).setValidators(Validators.required);
    form.get(control).updateValueAndValidity();
    form.get(control).markAsUntouched();
  }
}
