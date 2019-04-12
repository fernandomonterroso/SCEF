import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UbicacionGarantiaComponent } from './components/ubicacion-garantia/ubicacion-garantia.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriasSIBComponent } from './components/categorias-sib/categorias-sib.component';
import { AcercamientosComponent } from './components/acercamientos/acercamientos.component';
import { AsesoresPrestamoComponent } from './components/asesores-prestamo/asesores-prestamo.component';
import { TiposDeduccionesComponent } from './components/tipos-deducciones/tipos-deducciones.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ubicacionGarantia', component: UbicacionGarantiaComponent},
  {path: 'categoriasSIB', component: CategoriasSIBComponent},
  {path: 'acercamientos', component: AcercamientosComponent},
  {path: 'asesoresPrestamo', component: AsesoresPrestamoComponent},
  {path: 'tiposDeducciones', component: TiposDeduccionesComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
