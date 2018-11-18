import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RutValidator } from 'src/app/validators';
import { RutPipe } from 'ng2-rut';
import { Router } from '@angular/router';

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
 

  constructor(private router: Router) { 
    this.form = new FormGroup({
      rut: new FormControl(null, {
        validators: [Validators.required, RutValidator.checkRut]
      }),
       recaptchaReactive: new FormControl(null, Validators.required)      
    });

    this.formPassword = new FormGroup({
      password : new FormControl(null, Validators.required)
    });
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
      rut = rut.substring(0, rut.length - 1);
      setTimeout(() => {
        this.existsProcess = true;
        this.isClient = true;
      this.loading = false;
      this.removeValidatorFormPassword();
      }, 2000);
      
     /*  this.suscripcionService.getEstado(rut).subscribe(
        data =>{    
          setTimeout(()=>{
            this.statusAsegurable = data;
            this.isClient = this.statusAsegurable.cliente;
            this.existsProcess = this.statusAsegurable.estado;
            this.nombre = this.statusAsegurable.nombre;
            this.loading = false;
            this.removeValidatorFormPassword();
  
            //No existe proceso, muestra mensaje del servicio
            if(!this.existsProcess){
              this.mensaje = this.statusAsegurable.descripcion;
            }
          },1000);           
        },
        err =>{
          console.error(err);
          this.handlerModalError();
          this.loading = false;
        }
      ); */
    }
    else{
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).markAsTouched();
      });
    }
  }

  formPasswordSubmit(){  
    //Valida que se ingrese la contraseña o numero de serie 
    if(this.formPassword.valid){
        this.loading = true;
        this.error = "";
        const rutPipe = new RutPipe();        
        let rut = rutPipe.transform(this.form.get('rut').value).replace(/\./g,''); //this.form.get('rut').value;      
        let clave = (this.isClient) ? this.formPassword.get('password').value : this.formPassword.get('numeroSerie').value;

        setTimeout(() => {
          this.router.navigate(['/declaracion']);
          this.loading = false;
        }, 1000);  
        /* this.ssoService.login(rut, clave, this.isClient).then(
          data => {
            if(data === true){
              setTimeout(() => {
                this.router.navigate(['/incorporacion']);
                this.loading = false;
              }, 1000);              
            }else{
              this.loading = false;
              this.error = this.isClient ? this.MensajeErrorContrasena : this.MensajeErrorNumeroDocumento;
            }
          }
        ).catch(err => {
          console.log(err)
          this.loading = false;
        });    */              
    }else{     
        Object.keys(this.formPassword.controls).forEach(key => {
          this.formPassword.get(key).markAsTouched();
        });    
    }
  }

  removeValidatorFormPassword() : void{   
    if(this.isClient){
      this.activeControlsValidators(this.formPassword, 'password');   
    }else{
      this.activeControlsValidators(this.formPassword, 'numeroSerie');   
    }
    this.error = "";
  }
 
  activeControlsValidators(form : FormGroup, control : string): void{
    form.get(control).setValidators(Validators.required);
    form.get(control).updateValueAndValidity();
    form.get(control).markAsUntouched();
  }
}
