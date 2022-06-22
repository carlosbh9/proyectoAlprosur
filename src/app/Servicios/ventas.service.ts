import { Injectable } from '@angular/core';
import { Venta ,ventaAux} from '../Interfaces';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http : HttpClient) { }


  getVentas(){
    let header  = new HttpHeaders().set('Type-content','aplication/json')
    return this.http.get<Venta[]>('http://localhost:3500/API/v1/ventas/lista',{
      headers:header
    });
  }


  setVenta(venta : ventaAux): Observable<ventaAux>{
    return this.http.post<ventaAux>('http://localhost:3500/API/v1/ventas',venta);
  }
  updateVenta(id:number,venta:ventaAux){
    return this.http.patch('http://localhost:3500/API/v1/ventas/'+id,venta)
  }

  deleteVenta(id: number){
    return this.http.delete('http://localhost:3500/API/v1/ventas/'+id)
  }

  findByVenta(id : number){
    return this.http.get<Venta>('http://localhost:3500/API/v1/ventas/'+id)
  }
  ventaEmpty():Venta{
    return{
      id: 0,
      cliente:   "",
      fecha:    new Date() ,
      monto:     0,
      clienteId: 0,
    }
  }
  ventaEmptyAux():ventaAux{
    return{

      cliente:   "",
      fecha:    new Date() ,
      monto:     0,
      clienteId: 0,
    }
  }
}
