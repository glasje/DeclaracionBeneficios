// ANGULAR COMMON
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import localeCL from '@angular/common/locales/es-CL';

// COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DeclaracionbeneficiosComponent } from './components/declaracionbeneficios/declaracionbeneficios.component';

// SERVICES

// DIRECTIVES
import {
  RutCharsDirective,
  PhoneCharDirective,
  OnlyNumbersDirective,
  DisableControlDirective
} from './directives';

import { routing } from './app.routing';
// EXTRAS
import { LoadersCssModule } from 'angular2-loaders-css';
import { Ng2Rut } from 'ng2-rut';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalAgregarpropietarioComponent } from './components/modal-agregarpropietario/modal-agregarpropietario.component';

registerLocaleData(localeCL);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DeclaracionbeneficiosComponent,
    RutCharsDirective,
    PhoneCharDirective,
    OnlyNumbersDirective,
    DisableControlDirective,
    ModalAgregarpropietarioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2Rut,
    routing,
    LoadersCssModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
