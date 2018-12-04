import { Component, OnInit } from '@angular/core';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { Declarante } from 'src/app/models/declarante';
import { TokenJwtService } from 'src/app/services/token-jwt.service';

@Component({
  selector: 'app-declaracion-enviada',
  templateUrl: './declaracion-enviada.component.html',
  styleUrls: ['./declaracion-enviada.component.css']
})
export class DeclaracionEnviadaComponent implements OnInit {
  declarante : any;
  FechaActual: Date;
  ideDeclaracion: any;
  constructor( 
    private _beneficiarioService: BeneficiarioService,
    private _tokenService : TokenJwtService) { 
    this.declarante = {
      nombre :"",
      apellidos:"",
      feCreacion : ""
    };
  }

  ngOnInit() {
    this.ideDeclaracion = this._tokenService.GetIdDecla();

    this.declarante= this._beneficiarioService.declarante;
    this.FechaActual = new Date();
    this.ObtenerDeclaracion();
  }
  ObtenerDeclaracion(){
    this._beneficiarioService.ObtenerDeclaracion(this.ideDeclaracion).subscribe(
      data=>{
        this.declarante= data.data.declarante;

      },
      error=>{

      }
    )
  }
}
