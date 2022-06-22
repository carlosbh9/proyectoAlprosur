import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Interfaces';

@Component({
  selector: 'app-tbcliente',
  templateUrl: './tbcliente.component.html',
  styles: [
  ]
})
export class TbclienteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() ClienteInput: Cliente ={
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
