import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UbicacionGarantiaComponent } from './components/ubicacion-garantia/ubicacion-garantia.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriasSIBComponent } from './components/categorias-sib/categorias-sib.component';
import { AcercamientosComponent } from './components/acercamientos/acercamientos.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ubicacionGarantia', component: UbicacionGarantiaComponent},
  {path: 'categoriasSIB', component: CategoriasSIBComponent},
  {path: 'acercamientos', component: AcercamientosComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
