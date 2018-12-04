import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DeclaracionbeneficiosComponent } from './components/declaracionbeneficios/declaracionbeneficios.component';
import { DeclaracionEnviadaComponent } from './components/declaracion-enviada/declaracion-enviada.component';



const appRoutes: Routes = [
  {
    path: 'declaracion',
    component: DeclaracionbeneficiosComponent
  },
  {
    path: 'declaracionEnviada',
    component: DeclaracionEnviadaComponent
  },
  {
    path: '',
    component : LoginComponent
  },
  { path: '',   redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

/**
 * Rutas definidas en la aplicación
 */
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
