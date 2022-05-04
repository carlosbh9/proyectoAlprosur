import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente'
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public cliente: Cliente =this.ClienteEmpty(); 
  public clientes: Cliente []= [];
  public position: number = -1; 

  
  onDatos(): void {
    if (this.position == -1) {
      console.log(this.cliente);
      this.clientes.push(this.cliente);
      this.cliente = this.ClienteEmpty();
    } else {
      let selection: Cliente = this.clientes[this.position];
      selection.idCliente = this.cliente.idCliente;
      selection.nombre = this.cliente.nombre;
      selection.telefono = this.cliente.telefono;
      selection.email = this.cliente.email;
      this.cliente = this.ClienteEmpty();
      this.position = -1;
    }
  }

  ClienteEmpty(): Cliente {
    return{
    idCliente: 0,
    nombre: "",
    telefono: "",
    email: "",
    };
  }

  onEdit(i: number): void {
    //this.pedido = this.pedidos[i];
    let selection: Cliente = this.clientes[i];
    this.cliente.idCliente = selection.idCliente;
    this.cliente.nombre = selection.nombre;
    this.cliente.telefono = selection.telefono;
    this.cliente.email = selection.email;
    this.position = i;
  }

  onDelete(i: number): void{
    this.clientes.splice(i, 1);
  }

}
