import { Component, OnInit } from '@angular/core';
import { Lote, Lotes, Producto, Productos } from './lote';
import { LotesService } from 'src/app/Servicios/lotes.service';
import { ProductosService } from 'src/app/Servicios/productos.service';

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: ['./lotes.component.css'
  ]
})
export class LotesComponent implements OnInit {

  constructor(
    private svcLotes: LotesService,
    private svcProductos: ProductosService
  ) { }

  ngOnInit(): void {
  }
  ListaProductos(): Producto[]{
    return this.svcProductos.getProductos()
  }
  
  prvacio: Producto = {
    id: 0,
    codigo: "",
    nombre: "",
    detalles: "",
    precio: 0,
    estaIncluidoEnLotes: []
  }

  //fechas temporales
  fechaAct: Date = new Date()

  //Variables auxiliares
  repetir: boolean = true
  i: number = 0
  codigo: string = ""
  pos: number = -1
  //Fin variables auxiliares
  listarLotes(): Lote[]{
    return Lotes
  }

  altLote: Lote = {
    id: 0,
    cantidadDisponible: 0,
    fechaVencimientoProducto: new Date("1970-01-02"),
    estaIncluidoEnDetallesDeAtencion: [],
    contieneProducto: this.prvacio
  }

  //Instancias vacías
  vaciarInstancias(){
    //Lote
    this.altLote = {
      id: 0,
      cantidadDisponible: 0,
      fechaVencimientoProducto: new Date("1970-01-02"),
      estaIncluidoEnDetallesDeAtencion: [],
      contieneProducto: this.prvacio
    }
    //Producto
    this.prvacio = {
      id: 0,
      codigo: "",
      nombre: "",
      detalles: "",
      precio: 0,
      estaIncluidoEnLotes: []
    }
  }
  onRegistrar(){
    this.repetir = true
    this.i = 0

    //veriificar que ningún campo este vacío
    if (this.altLote.cantidadDisponible == 0 || this.altLote.fechaVencimientoProducto == new Date("1970-01-02") || this.prvacio.codigo == "" ){
      console.log("Error al crear el lote, uno o más campos están vacíos")
    //que la cantidad no sea negativa
    }else if (this.altLote.cantidadDisponible < 0){
      console.log("La cantidad no puede ser cero")
    //que la fecha no sea menor a la actual
    }else if (this.altLote.fechaVencimientoProducto <= this.fechaAct){
      console.log(this.altLote.fechaVencimientoProducto)
      console.log("La fecha de vencimiento no es válida")
    }else{
      //Buscar el producto por codigo
      while (this.repetir){
        if (this.i == Productos.length){
          console.log("Error, no se pudo agregar el Lote por que el producto no existe, o no hay productos")
          this.repetir = false
        }else{
          if (Productos[this.i].codigo == this.prvacio.codigo){
            this.altLote.contieneProducto = Productos[this.i]
            if (Lotes.length == 0){
              this.altLote.id = 1
            }else{
              this.altLote.id = Lotes[Lotes.length-1].id + 1
            }
  
            //agregar un nuevo producto
            Lotes.push(this.altLote)
            console.log("Lote añadido con éxito")

            this.repetir = false
            this.vaciarInstancias()
          }else{
            this.i++
          }
        }
      }
    }
    this.vaciarInstancias()
  }

  onBorrarTabla(l: number){
    Lotes.splice(l,1)
    this.vaciarInstancias()
  }

  onModificarTabla(l:number){
    let seleccion: Lote = Lotes[l]
    
    this.altLote.id = seleccion.id
    this.altLote.cantidadDisponible = seleccion.cantidadDisponible
    this.altLote.fechaVencimientoProducto = seleccion.fechaVencimientoProducto
    this.prvacio.codigo = seleccion.contieneProducto.codigo
    this.pos = l
  }
  onActualizar(){
    this.repetir = true
    this.i = 0

    if (this.pos == -1){
      console.log("imposible modificar, el Lote no existe")
    }else if (this.altLote.cantidadDisponible == 0 || this.altLote.fechaVencimientoProducto == new Date("1970-01-02") || this.prvacio.codigo == "" ){
      console.log("Error al modificar el lote, uno o más campos están vacíos")
    //que la cantidad no sea negativa
    }else if (this.altLote.cantidadDisponible == Lotes[this.pos].cantidadDisponible && this.altLote.fechaVencimientoProducto == Lotes[this.pos].fechaVencimientoProducto && this.prvacio.codigo == Lotes[this.pos].contieneProducto.codigo){
      console.log("No ha realizado modificación alguna")
    }else if (this.altLote.cantidadDisponible < 0){
      console.log("La cantidad no puede ser cero")
    //que la fecha no sea menor a la actual
    }else if (this.altLote.fechaVencimientoProducto <= this.fechaAct){
      console.log("La fecha de vencimiento no es válida")
    }else{
      //buscar si el nuevo producto existe
      while (this.repetir){
        if (this.i == Productos.length){
          console.log("Error, no se pudo modificar el Lote por que el producto no existe")
          this.repetir = false
        }else{
          if (Productos[this.i].codigo == this.prvacio.codigo){
            this.altLote.contieneProducto = Productos[this.i]
            Lotes[this.pos].cantidadDisponible = this.altLote.cantidadDisponible
            Lotes[this.pos].fechaVencimientoProducto = this.altLote.fechaVencimientoProducto
            Lotes[this.pos].contieneProducto = this.altLote.contieneProducto

            console.log("El Lote ha sido modificado")
            this.repetir = false
            this.vaciarInstancias()
          }else{
            this.i++
          }
        }
      }
    }
    this.pos = -1
  }
}
