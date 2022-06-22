import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/Servicios/ventas.service';
import { Venta ,Cliente} from 'src/app/Interfaces';
import { ClientesService } from 'src/app/Servicios/clientes.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  constructor(private svcVentas : VentasService,private svcClientes : ClientesService) { }
  public ventas : Venta[]=[];
  public clientes : Cliente[]=[];
  ngOnInit(): void {
    this.svcVentas.getVentas().subscribe(res=>{
      this.ventas=res})
      console.log(this.ventas)

      this.svcClientes.getClientes().subscribe(res=>{
        this.clientes=res})
        console.log(this.ventas)


  }
  public cliente : Cliente =this.svcClientes.ClienteEmpty2() ;
  public venta: Venta = this.svcVentas.ventaEmpty();
  public id: number = 0;

  onDatos(): void {
    this.svcVentas.setVenta(this.venta).subscribe(data=>{
      console.log(data)
    });
    console.log(this.venta)
  }

  findByCliente(id: number):void{
    this.svcClientes.findByCliente(id).subscribe(data => {
      console.log(data);
    })
  }

  actualizarVenta(): void{
 this.svcVentas.updateVenta(this.id,this.venta).subscribe(data =>{
      console.log(data);
    })
  }
  onEdit(i: number): void {


    this.svcVentas.findByVenta(i).subscribe(data=>{
      this.venta=data;
    });
    this.id= i;

    //this.pedido = this.pedidos[i];
    // let selection: Venta = this.ventas[i];
    // this.venta.cliente = selection.cliente;
    // this.venta.fecha = selection.fecha;
    // this.position = i;
  }

  onDelete(i: number): void {
    this.svcVentas.deleteVenta(i).subscribe(data =>{
      console.log(data)
    });
    //this.ventas.splice(i, 1);
  }

}
