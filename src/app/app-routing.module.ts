import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponentComponent } from './components/cliente/cliente-component/cliente-component.component';
import { ResumenComponentComponent } from './components/resumen/resumen-component/resumen-component.component';

const routes: Routes = [
  { path: '', redirectTo: '/cliente', pathMatch: 'full' },
  { path: 'cliente', component: ClienteComponentComponent },
  { path: 'resumen', component: ResumenComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
