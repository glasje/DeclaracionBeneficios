// ANGULAR COMMON
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import localeCL from '@angular/common/locales/es-CL';

// Captcha Google
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

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
import { LoginService } from './services/login.service';
import { ModalComponent } from './components/modal/modal.component';
import { DomService } from './services/dom.service';
import { ModalService } from './services/modal.service';

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
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2Rut,
    routing,
    LoadersCssModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    
  ],
  providers: [
    LoginService,
    DomService,
    ModalService,
    { provide: LOCALE_ID, useValue: 'es-CL' },
    {provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LdzTHwUAAAAAJjRMdpRLT9HL0hXnztCfKVFweeM',
      } as RecaptchaSettings,
    }
  ],
  entryComponents: [
    ModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
