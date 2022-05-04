import { Component, OnInit } from '@angular/core';
import { Producto, Productos } from './producto';
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

  setAltProductoVacio(): Producto{
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

  // Crear un Producto nuevo
  onCrearProducto2(){
    this.repetir = true;
    this.i = 0;

    //No deben de haber campo vacíos
    if (this.altProducto.codigo == "" || this.altProducto.nombre == "" || this.altProducto.detalles == "" || this.altProducto.precio == 0){
      console.log("No se puede crear el producto, uno o más campos no contienen datos")
    }else{

      //Verificar que el código o el nombre no existan
      while (this.repetir){

        if (this.i < Productos.length){
        //Si el nombre o el codigo son iguales ya no se crea el producto
          if (Productos[this.i].nombre == this.altProducto.nombre || Productos[this.i].codigo == this.altProducto.codigo){
            console.log("Error, no se puede crear 2 productos con nombres y/o codigos iguales")
            this.repetir = false
          }
        }else if (this.i == Productos.length){
          // Si termino de buscar añade el Producto y crea una ID de acuerdo
          this.id++;
          this.altProducto.id = this.id;

          Productos.push(this.altProducto)
          console.log("Producto creado con éxito")

          this.repetir = false;
        }
        this.i++;
      }
    }
    this.altProducto = this.setAltProductoVacio()
    this.pos = -1
  }

  onModificarProductoTabla(a: number){
    this.titulo = "Modificar un Producto"

    // rellenar los datos
    let seleccion: Producto = Productos[a]

    this.altProducto.id = seleccion.id
    this.altProducto.codigo = seleccion.codigo
    this.altProducto.nombre = seleccion.nombre
    this.altProducto.detalles = seleccion.detalles
    this.altProducto.precio = seleccion.precio

    this.pos = a
  }

  ModificarProducto(){
    this.repetir = true;
    this.i = 0;
    
    if (this.pos == -1){
      console.log("Imposible modificar, Producto no detectado")
    }else{

      if (this.altProducto.codigo == "" || this.altProducto.nombre == "" || this.altProducto.detalles == "" || this.altProducto.precio <= 0){
        console.log("No se puede modificar el producto, uno o más campos no contienen datos")
      }else if(this.altProducto.nombre == Productos[this.pos].nombre && 
               this.altProducto.detalles == Productos[this.pos].detalles &&
               this.altProducto.precio == Productos[this.pos].precio){
        console.log("No ha realizado algún cambio notable sobre el producto, Operación cancelada")
      }else{
        while (this.repetir){
          if (this.i == Productos.length){
            
            Productos[this.pos].nombre = this.altProducto.nombre
            Productos[this.pos].detalles = this.altProducto.detalles
            Productos[this.pos].precio = this.altProducto.precio
            this.repetir = false
            console.log("Datos actualizados")
          }else if (Productos[this.i].nombre == this.altProducto.nombre){
            if (this.pos != this.i ){
              console.log("Error, no se puede modificar el Producto por que el nombre ya existe")
              this.repetir = false
            }
          }
          this.i++
        }
      }
      this.titulo = "Agregar un Producto"
    }
    this.altProducto = this.setAltProductoVacio()
    this.pos = -1
  }

  onBuscar2(){
    this.repetir = true;
    this.i = 0;

    if (this.bscProducto.id <= 0){
      console.log("Error, ID no válida")
    }else{
      while (this.repetir){
        if (this.i == Productos.length){
          console.log("Error, ID de Producto no encontrada")
          this.repetir = false
        }else if(Productos[this.i].id == this.bscProducto.id){
          console.log("Producto enoontrado")

          this.pos2 = this.i
          this.bscProducto.nombre = Productos[this.pos2].nombre
          this.repetir = false
        }
        this.i++
      }
    }
  }

  onBorrar2(){
    if (this.pos2 == -1){
      console.log("El Producto que quiso borrar no se encuentra en la tabla")
    }else{
      Productos.splice(this.pos2,1)
      console.log("Producto borrado con éxito")
    }
    this.pos = -1
    this.pos2 = -1
    this.altProducto = this.setAltProductoVacio()
    this.bscProducto = this.setAltProductoVacio()
  }

  onBorrarTabla(i: number){
    Productos.splice(i,1)
    console.log("Producto borrado con éxito")

    this.altProducto = this.setAltProductoVacio()
    this.bscProducto = this.setAltProductoVacio()
  }

  onModificar2(){
    this.titulo = "Modificar un Producto"

    this.pos = this.pos2

    let seleccion: Producto = Productos[this.pos]

    this.altProducto.id = seleccion.id
    this.altProducto.codigo = seleccion.codigo
    this.altProducto.nombre = seleccion.nombre
    this.altProducto.detalles = seleccion.detalles
    this.altProducto.precio = seleccion.precio

    this.bscProducto = this.setAltProductoVacio()
  }
}
