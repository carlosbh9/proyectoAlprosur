import { Component, OnInit } from '@angular/core';
import {Cliente} from 'src/app/Interfaces'
import { ClientesService } from 'src/app/Servicios/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  public clientes : Cliente [] = [] ;
  constructor(
    private svcClientes: ClientesService
  ) {
    // this.svcClientes.getClientes().subscribe(res =>{
    //   console.log(res);
    // })
  }

  ngOnInit(): void {

  this.svcClientes.getClientes().subscribe(res=>{
      this.clientes=res})
      console.log(this.clientes)
  }

 public cliente: Cliente = this.svcClientes.ClienteEmpty2();
  public id: number = 0;

  // ListaCliente() :Cliente[] {
  //   this.svcClientes.getClientes().subscribe(res=>{
  //     this.clientes=res}
  //     ,error => {
  //       console.log(error)
  //     });
  //     return this.clientes;

  // }


  ingresarDatos(): void {
    this.svcClientes.setCliente(this.cliente).subscribe(data=>{
      console.log(data)
    });

  }

  ClienteEmpty(): Cliente {
    return this.svcClientes.ClienteEmpty2()
  }
  ActualizarCliente(): void{
  this.svcClientes.update(this.id,this.cliente).subscribe(data =>{
      console.log(data)
    })

  }
  editar(i: number): void {
    this.svcClientes.findByCliente(i).subscribe(data =>{
      this.cliente=data
    })
    this.id=i;

    //this.cliente = this.clientes[i];
    //this.svcClientes.onEdit2(i)
    console.log(this.clientes+"id : "+i)
    //this.position = i;
  }

  EliminarCliente(i: number): void{
    this.svcClientes.delete(i).subscribe(data =>{
      console.log(data)
    });
    // this.svcClientes.onDelete2(i)
    // this.position = -1
  }

}
