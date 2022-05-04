import { Injectable } from '@angular/core';
import { Lote, Producto } from '../Interfaces';
import { ProductosService } from './productos.service';

@Injectable({
  providedIn: 'root'
})
export class LotesService {

  constructor(
    private svcProductos: ProductosService
  ) {}

  private Lotes: Lote[] = []
  getLotes(): Lote[]{
    return this.Lotes
  }

  //Borrar un producto (con sus lotes)
  borrarBuscado(pos2:number){
    if (pos2 == -1){
      console.log("El Producto que quiso borrar no se encuentra en la tabla")
    }else{
      this.borrarDeTabla(pos2)
    }
  }

  borrarDeTabla(i: number){
    let Productos2: Producto[] = this.svcProductos.getProductos();
    if (this.svcProductos.getProductos()[i].estaIncluidoEnLotes.length == 0){
      Productos2.splice(i,1)
      this.svcProductos.setProductos(Productos2)
      console.log("Producto borrado con éxito")
    }else{
      let i2: number = 0
      while(Productos2[i].estaIncluidoEnLotes.length > 0){
        if (Productos2[i].estaIncluidoEnLotes[0] == this.Lotes[i2]){
          Productos2[i].estaIncluidoEnLotes.splice(0,1);
          this.Lotes.splice(i2,1)
        }else{
          i2++;
        }
      }
      Productos2.splice(i,1)
      this.svcProductos.setProductos(Productos2)
      console.log("Producto borrado con éxito")
    }
  }
  //fin de Borrar un producto (con sus lotes)

  nuevoLote(repetir: boolean, i: number, id: number, altLote: Lote, prvacio: Producto, fechaAct: Date): number{
    let Productos2: Producto[] = this.svcProductos.getProductos();

    //veriificar que ningún campo este vacío
    if (altLote.cantidadDisponible == 0 || altLote.fechaVencimientoProducto == new Date("1970-01-02") || prvacio.nombre == "" ){
      console.log("Error al crear el lote, uno o más campos están vacíos")
    //que la cantidad no sea negativa
    }else if (altLote.cantidadDisponible < 0){
      console.log("La cantidad no puede ser negativa")
    //que la fecha no sea menor a la actual
    }else if (altLote.fechaVencimientoProducto <= fechaAct){
      console.log(altLote.fechaVencimientoProducto)
      console.log("La fecha de vencimiento no es válida")
    }else{
      //Buscar el producto por codigo
      while (repetir){
        if (i == Productos2.length){
          console.log("Error, no se pudo agregar el Lote por que el producto no existe, o no hay productos")
          repetir = false
        }else{
          if (Productos2[i].nombre == prvacio.nombre){
            altLote.contieneProducto = Productos2[i]

            id++
            altLote.id = id
  
            //agregar un nuevo producto
            this.Lotes.push(altLote)

            //agregar el Lote a Producto
            Productos2[i].estaIncluidoEnLotes.push(altLote)
            console.log("Lote añadido con éxito")

            repetir = false
          }else{
            i++
          }
        }
      }
      this.svcProductos.setProductos(Productos2)
    }
    return id;
  }

  borrarLoteDeTabla(l: number, repetir: boolean, i: number){
    while (repetir){
      if (i == this.Lotes[l].contieneProducto.estaIncluidoEnLotes.length){
        repetir = false
        console.log ("Error Inesperado, no se encontró el lote a borrar")
      }else if (this.Lotes[l].contieneProducto.estaIncluidoEnLotes[i].id == this.Lotes[l].id){
        this.Lotes[l].contieneProducto.estaIncluidoEnLotes.splice(i,1)
        repetir = false;
      }else{
        i++
      }
    }
    this.Lotes.splice(l,1)
  }
  
  seleccionarLote(l: number, altLote: Lote): Lote{
    let seleccion: Lote = this.Lotes[l]
    
    altLote.id = seleccion.id
    altLote.cantidadDisponible = seleccion.cantidadDisponible
    altLote.fechaVencimientoProducto = seleccion.fechaVencimientoProducto
    altLote.contieneProducto = seleccion.contieneProducto
    
    return altLote
  }
  seleccionarProductodeLote(l: number, prvacio: Producto): string{
    let seleccion: Lote = this.Lotes[l]
    
    prvacio.nombre = seleccion.contieneProducto.nombre

    return prvacio.nombre
  }

  actualizarLote(repetir: boolean, pos: number, i: number, altLote: Lote, prvacio: Producto, fechaAct: Date){
    if (pos == -1){
      console.log("imposible modificar, el Lote no existe")
    }else if (altLote.cantidadDisponible == 0 || altLote.fechaVencimientoProducto == new Date("1970-01-02") || prvacio.nombre == "" ){
      console.log("Error al modificar el lote, uno o más campos están vacíos")
    //que la cantidad no sea negativa
    }else if (altLote.cantidadDisponible == this.Lotes[pos].cantidadDisponible && altLote.fechaVencimientoProducto == this.Lotes[pos].fechaVencimientoProducto && prvacio.nombre == this.Lotes[pos].contieneProducto.nombre){
      console.log("No ha realizado modificación alguna")
    }else if (altLote.cantidadDisponible < 0){
      console.log("La cantidad no puede ser negativa")
    //que la fecha no sea menor a la actual
    }else if (altLote.fechaVencimientoProducto <= fechaAct){
      console.log("La fecha de vencimiento no es válida")
    }else{
      //buscar si los productos son iguales
      //si son iguales entonces modificar
      if (altLote.contieneProducto.nombre == prvacio.nombre){
        this.Lotes[pos].cantidadDisponible = altLote.cantidadDisponible
        this.Lotes[pos].fechaVencimientoProducto = altLote.fechaVencimientoProducto
        console.log("El Lote ha sido modificado")
      }else{
      //si no son iguales se deberá de eliminar el Lote del producto en el que estaba antes y ponerlo en el nuevo producto
      console.log("no son iguales")
        while (repetir){
          if (i == this.svcProductos.getProductos().length){
            console.log("Error, no se pudo modificar el Lote por que el producto no existe")
            repetir = false
          }else{
            //Si encuentra el nuevo producto buscaremos el lote en el viejo producto y lo eliminaremos
            if (this.svcProductos.getProductos()[i].nombre == prvacio.nombre){
              let repetir2: boolean = true
              let i2: number = 0

              //Buscar el lote en el viejo producto para quitarlo
              while (repetir2){
                if (i2 == altLote.contieneProducto.estaIncluidoEnLotes.length){
                  repetir2 = false
                }else if (altLote.contieneProducto.estaIncluidoEnLotes[i2].id == altLote.id){
                  altLote.contieneProducto.estaIncluidoEnLotes.splice(i2,1)
                  repetir2 = false;
                }else{
                  i2++
                }
              }

              //Actualizar datos
              altLote.contieneProducto = this.svcProductos.getProductos()[i]
              this.Lotes[pos].cantidadDisponible = altLote.cantidadDisponible
              this.Lotes[pos].fechaVencimientoProducto = altLote.fechaVencimientoProducto
              this.Lotes[pos].contieneProducto = altLote.contieneProducto
              this.svcProductos.getProductos()[i].estaIncluidoEnLotes.push(altLote)

              console.log("El Lote ha sido modificado")
              repetir = false
            }else{
              i++
            }
          }
        }
      }      
    }
  }
}
