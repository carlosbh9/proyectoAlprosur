import { Component, OnInit } from '@angular/core';
import { Venta } from './venta';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public venta: Venta = this.pedidoEmpty();
  public ventas: Venta[] = [];
  public position: number = -1;

  onDatos(): void {
    if (this.position == -1) {
      console.log(this.venta);
      this.ventas.push(this.venta);
      this.venta = this.pedidoEmpty();
    } else {
      let selection: Venta = this.ventas[this.position];
      selection.cliente = this.venta.cliente;
      selection.fecha = this.venta.fecha;
      selection.monto = this.venta.monto;
      this.venta = this.pedidoEmpty();
      this.position = -1;
    }
  }

  pedidoEmpty(): Venta {
    return {
      cliente: "",
      fecha: "",
      monto: 0
    };
  }

  onEdit(i: number): void {
    //this.pedido = this.pedidos[i];
    let selection: Venta = this.ventas[i];
    this.venta.cliente = selection.cliente;
    this.venta.fecha = selection.fecha;
    this.position = i;
  }
  
  onDelete(i: number): void {
    this.ventas.splice(i, 1);
  }

}
