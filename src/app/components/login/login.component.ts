import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RutValidator } from 'src/app/validators';
import { RutPipe } from 'ng2-rut';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

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
  empresa: any;
  mensaje: any;
 

  constructor(private router: Router,
              private _loginService : LoginService) { 
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
      this._loginService.ValidarRut(rut).subscribe(
        data =>{ 
          console.log('data',data);
          this.empresa=data;
          console.log('emopresa',this.empresa.data);
          if(this.empresa.data.existe){
            this.existsProcess=true;
            this.loading = false;
            this.isClient=true;
          }else{
            this.mensaje= this.empresa.data.mensaje;
            this.loading=false;
            this.form.reset();
          }
        },
        err =>{
          console.error(err);
          this.loading = false;
        }
      ); 
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
        let rut = rutPipe.transform(this.form.get('rut').value).replace('-',''); 
        rut = rut.substring(0,rut.length-1).replace('.','').replace('.','');   
        console.log('retu',rut);
        let clave = (this.isClient) ? this.formPassword.get('password').value : this.formPassword.get('numeroSerie').value;
        let empresa ={
          rut:rut,
          password :clave
        }
       /*  setTimeout(() => {
          
        }, 1000);   */
        this._loginService.ValidarPassword(empresa).subscribe(
          data=>{
            console.log('data',data);
          this.empresa=data;
          console.log('emopresa',this.empresa.data);
          if(this.empresa.data.existe){
            this.router.navigate(['/declaracion']);
            this.loading = false;
          }else{
            this.error=this.empresa.data.mensaje;
            this.form.reset();
          }
            
           
          },error=>{
            console.log('error',error);
          }
        )
                   
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
