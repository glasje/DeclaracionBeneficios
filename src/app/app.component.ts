import { Component, OnInit } from '@angular/core';
import { TokenJwtService } from './services/token-jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SuscripcionVidaSecurity';
  constructor(private tokenService : TokenJwtService){

  }
  ngOnInit(){
    this.tokenService.ClearToken();
    this.tokenService.SetToken('');
    this.tokenService.GetTokenByService().subscribe(
      data =>{
     

        this.tokenService.SetToken(data.token);
      },
      error=>{
        console.log('error',error)
      }
    )
  }
}
