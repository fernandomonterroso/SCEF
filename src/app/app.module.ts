import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//MODULOS
import { MetarialModule } from './material.module'
import { AppRoutingModule } from './app-routing.module';

//COMPONENTES
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UbicacionGarantiaComponent } from './components/ubicacion-garantia/ubicacion-garantia.component';
import { CategoriasSIBComponent } from './components/categorias-sib/categorias-sib.component';
import { AcercamientosComponent } from './components/acercamientos/acercamientos.component';
import { AsesoresPrestamoComponent } from './components/asesores-prestamo/asesores-prestamo.component';
import { TiposDeduccionesComponent } from './components/tipos-deducciones/tipos-deducciones.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UbicacionGarantiaComponent,
    CategoriasSIBComponent,
    AcercamientosComponent,
    AsesoresPrestamoComponent,
    TiposDeduccionesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MetarialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
