import { Component, OnInit } from '@angular/core';
import { Pedido } from './pedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public pedido: Pedido = this.pedidoEmpty();
  public pedidos: Pedido[] = [];
  public position: number = -1;

  onDatos(): void {
    if (this.position == -1) {
      console.log(this.pedido);
      this.pedidos.push(this.pedido);
      this.pedido = this.pedidoEmpty();
    } else {
      let selection: Pedido = this.pedidos[this.position];
      selection.supermercado = this.pedido.supermercado;
      selection.producto = this.pedido.producto;
      selection.cantidad = this.pedido.cantidad;
      selection.fecha = this.pedido.fecha;
      this.pedido = this.pedidoEmpty();
      this.position = -1;
    }
  }

  pedidoEmpty(): Pedido {
    return {
      supermercado: "",
      producto: "",
      cantidad: 0,
      fecha: ""
    };
  }

  onEdit(i: number): void {
    //this.pedido = this.pedidos[i];
    let selection: Pedido = this.pedidos[i];
    this.pedido.supermercado = selection.supermercado;
    this.pedido.producto = selection.producto;
    this.pedido.cantidad = selection.cantidad;
    this.position = i;
  }
  
  onDelete(i: number): void {
    this.position=-1;
    this.pedidos.splice(i, 1);
  }
}
