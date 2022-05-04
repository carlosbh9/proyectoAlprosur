import { Injectable } from '@angular/core';
import { Producto } from '../Interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }

  //Matriz que almacena los datos
  private Productos: Producto[]=[];

  //Metodo get
  getProductos(): Producto[]{
    return this.Productos
  }
  setProductos(producto: Producto[]){
    this.Productos = producto
  }

  //Agregar Producto
  nuevoProducto(repetir: boolean, i: number, altProducto: Producto, id: number): number{
    repetir = true;
    i = 0;

    //No deben de haber campo vacíos
    if (altProducto.codigo == "" || altProducto.nombre == "" || altProducto.detalles == "" || altProducto.precio == 0){
      console.log("No se puede crear el producto, uno o más campos no contienen datos")
    }else{

      //Verificar que el código o el nombre no existan
      while (repetir){

        if (i < this.Productos.length){
        //Si el nombre o el codigo son iguales ya no se crea el producto
          if (this.Productos[i].nombre == altProducto.nombre || this.Productos[i].codigo == altProducto.codigo){
            console.log("Error, no se puede crear 2 productos con nombres y/o codigos iguales")
            repetir = false
          }
        }else if (i == this.Productos.length){
          // Si termino de buscar añade el Producto y crea una ID de acuerdo
          id++;
          altProducto.id = id;

          this.Productos.push(altProducto)
          console.log("Producto creado con éxito")

          repetir = false;
        }
        i++;
      }
    }
    console.log(this.getProductos.length)
    return id
  }

  seleccionarProductoTabla(a:number, altProducto: Producto): Producto{
    // rellenar los datos
    let seleccion: Producto = this.Productos[a]
    altProducto.id = seleccion.id
    altProducto.codigo = seleccion.codigo
    altProducto.nombre = seleccion.nombre
    altProducto.detalles = seleccion.detalles
    altProducto.precio = seleccion.precio
    return altProducto
  }

  modificarProducto(pos: number, altProducto :Producto, repetir: boolean, i: number ){
    if (pos == -1){
      console.log("Imposible modificar, Producto no detectado")
    }else{

      if (altProducto.codigo == "" || altProducto.nombre == "" || altProducto.detalles == "" || altProducto.precio <= 0){
        console.log("No se puede modificar el producto, uno o más campos no contienen datos")
      }else if(altProducto.nombre == this.Productos[pos].nombre && 
               altProducto.detalles == this.Productos[pos].detalles &&
               altProducto.precio == this.Productos[pos].precio){
        console.log("No ha realizado algún cambio notable sobre el producto, Operación cancelada")
      }else{
        while (repetir){
          if (i == this.Productos.length){
            
            this.Productos[pos].nombre = altProducto.nombre
            this.Productos[pos].detalles = altProducto.detalles
            this.Productos[pos].precio = altProducto.precio
            repetir = false
            console.log("Datos actualizados")
          }else if (this.Productos[i].nombre == altProducto.nombre){
            if (pos != i ){
              console.log("Error, no se puede modificar el Producto por que el nombre ya existe")
              repetir = false
            }
          }
          i++
        }
      }
    }
  }

  buscarProducto(repetir:boolean, i: number, pos2: number, bscProducto: Producto): number{
    if (bscProducto.id <= 0){
      console.log("Error, ID no válida")
    }else{
      while (repetir){
        if (i == this.Productos.length){
          console.log("Error, ID de Producto no encontrada")
          repetir = false
        }else if(this.Productos[i].id == bscProducto.id){
          console.log("Producto enoontrado")

          pos2 = i
          bscProducto.nombre = this.Productos[pos2].nombre
          repetir = false
        }
        i++
      }
    }
    return pos2
  }
}
