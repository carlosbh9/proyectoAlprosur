import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/Interfaces';
import { LotesService } from 'src/app/Servicios/lotes.service';
import { ProductosService } from 'src/app/Servicios/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(
    private svcProductos: ProductosService,
    private svcLotes: LotesService
  ) { }

  ListaProductos(): Producto[]{
    return this.svcProductos.getProductos()
  }
  ngOnInit(): void {
  }
 

  altProducto: Producto = {
    id: 0,
    codigo: "",
    nombre: "",
    detalles: "",
    precio: 0,
    estaIncluidoEnLotes: []
  }
  bscProducto: Producto = {
    id: 0,
    codigo: "",
    nombre: "",
    detalles: "",
    precio: 0,
    estaIncluidoEnLotes: []
  }

  ProductoVacio(): Producto{
    return {
      id: 0,
      codigo: "",
      nombre: "",
      detalles: "",
      precio: 0,
      estaIncluidoEnLotes: []
    }
  }

  // Variables auxiliares
  titulo: string = "Agregar un nuevo Producto"
  i: number = 0
  repetir: boolean = true
  pos: number = -1
  pos2: number = -1
  id: number = 0
  // Fin variables auxiliares

  //resetear variables
  reset(){
    this.pos = -1
    this.pos2 = -1
    this.altProducto = this.ProductoVacio()
    this.bscProducto = this.ProductoVacio()
  }

  // Crear un Producto nuevo
  onCrearProducto2(){
    this.id = this.svcProductos.nuevoProducto(this.repetir, this.i, this.altProducto, this.id)
    this.reset()
    this.titulo = "Agregar un nuevo Producto"
  }

  onModificarProductoTabla(a: number){
    this.titulo = "Modificar un Producto"
    this.altProducto = this.svcProductos.seleccionarProductoTabla(a,this.altProducto)
    this.pos = a
  }

  ModificarProducto(){
    this.svcProductos.modificarProducto(this.pos, this.altProducto, this.repetir, this.i)
    this.reset()
    this.titulo = "Agregar un nuevo Producto"
  }

  onBuscar2(){
    this.pos2 = this.svcProductos.buscarProducto(this.repetir, this.i, this.pos2, this.bscProducto)
  }

  onBorrar2(){
    this.svcLotes.borrarBuscado(this.pos2)
    this.reset()
    this.titulo = "Agregar un nuevo Producto"
  }

  onBorrarTabla(i: number){
    this.svcLotes.borrarDeTabla(i)
    this.reset()
    this.titulo = "Agregar un nuevo Producto"
  }

  onModificar2(){
    this.titulo = "Modificar un Producto"
    this.pos = this.pos2
    if (this.pos2 == -1){
      console.log ("Error, no hay el producto para modificar")
      this.reset()
    }else{
      this.altProducto = this.svcProductos.seleccionarProductoTabla(this.pos,this.altProducto)
      this.bscProducto = this.ProductoVacio()
    }
  }
}
