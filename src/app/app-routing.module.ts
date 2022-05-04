import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturasComponent } from './paginas/facturas/facturas.component';
import { LotesComponent } from './paginas/lotes/lotes.component';
import { PedidosComponent } from './paginas/pedidos/pedidos.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { VentasComponent } from './paginas/ventas/ventas.component';
import { ClientesComponent} from './paginas/clientes/clientes.component';

const routes: Routes = [

  {
    path:'',
    redirectTo: 'home',
    pathMatch:'full' 
  },
  {
    path:'pedido',
    component:PedidosComponent 
  }, 
{
  path:'venta',
  component:VentasComponent 
},{
  path:'factura',
  component:FacturasComponent 
},{
  path:'lote',
  component:LotesComponent 
},{
  path:'producto',
component:ProductosComponent
},{
  path:'cliente',
  component: ClientesComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
