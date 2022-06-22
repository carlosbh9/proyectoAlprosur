import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VentasComponent } from './paginas/ventas/ventas.component';
import { NavComponent } from './paginas/nav/nav.component';
import { PedidosComponent } from './paginas/pedidos/pedidos.component';
import { FacturasComponent } from './paginas/facturas/facturas.component';
import { FormsModule } from '@angular/forms';
import { LotesComponent } from './paginas/lotes/lotes.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { ClientesComponent } from './paginas/clientes/clientes.component';

import { TbclienteComponent } from './paginas/tablas/tbcliente/tbcliente.component';
import { TbproductosComponent } from './paginas/tablas/tbproductos/tbproductos.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    VentasComponent,
    NavComponent,
    PedidosComponent,
    FacturasComponent,
    LotesComponent,
    ProductosComponent,

    ClientesComponent,

        TbclienteComponent,
        TbproductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
