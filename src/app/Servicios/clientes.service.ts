import { Injectable } from '@angular/core';
import { Cliente , Clientes } from '../Interfaces';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  url = 'http://localhost:3500/API/v1/clientes/lista.json';

  constructor(
    private http : HttpClient
  ) { }
    public clientes: Cliente[]=[]
  ngOnInit(): void {

  }
  getClientes(){
    let header  = new HttpHeaders().set('Type-content','aplication/json')
    return this.http.get<Cliente[]>('http://localhost:3500/API/v1/clientes/lista',{
      headers:header
    });
  }


  setCliente(cliente : Cliente): Observable<Cliente>{
    return this.http.post<Cliente>('http://localhost:3500/API/v1/clientes',cliente);
  }
  //*****************************
  public cliente: Cliente = this.ClienteEmpty2();
  public position: number = -1;

  // ListaCliente2(): Cliente[]{
  //   return Clientes;
  // }

  update(id:number,cliente:Cliente){
    return this.http.patch('http://localhost:3500/API/v1/clientes/'+id,cliente)
  }

  delete(id: number){
    return this.http.delete('http://localhost:3500/API/v1/clientes/'+id)
  }

  findByCliente(id : number){
    return this.http.get<Cliente>('http://localhost:3500/API/v1/clientes/'+id)
  }
  onDatos2(position: number, cliente: Cliente): void {


    if (position == -1) {
      console.log(cliente);
      Clientes.push(cliente);

    } else {
      let selection: Cliente = Clientes[position];

      selection.id = cliente.id
      selection.ruc = cliente.ruc
      selection.dni = cliente.dni
      selection.nombre = cliente.nombre
      selection.aPaterno = cliente.aPaterno
      selection.aMaterno = cliente.aMaterno
      selection.telefono = cliente.telefono
      selection.correo = cliente.correo


    }
  }

  ClienteEmpty2(): Cliente {
    return{
    id: 0,
    ruc: "",
    dni: "",
    nombre: "",
    aPaterno: "",
    aMaterno: "",
    telefono: "",
    correo: ""

    }
  }

  onEdit2(i: number): void {
    //this.pedido = this.pedidos[i];
    let selection: Cliente = Clientes[i];

    this.cliente.id = selection.id
    this.cliente.ruc = selection.ruc
    this.cliente.dni = selection.dni
    this.cliente.nombre = selection.nombre
    this.cliente.aPaterno = selection.aPaterno
    this.cliente.aMaterno = selection.aMaterno
    this.cliente.telefono = selection.telefono
    this.cliente.correo = selection.correo

    this.position = i;
  }

  onDelete2(i: number): void{
    Clientes.splice(i, 1);
    this.position = -1
  }
}
