import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/Interfaces';

@Component({
  selector: 'app-tbproductos',
  templateUrl: './tbproductos.component.html',
  styles: [
  ]
})
export class TbproductosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  @Input() ProductoInput: Producto = {
    id: 0,
    codigo: "",
    nombre: "",
    detalles: "",
    precio: 0,
    estaIncluidoEnLotes: []
  }
}
