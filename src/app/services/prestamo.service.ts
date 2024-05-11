import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prestamo } from '../models/prestamo/prestamo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  url:string = "https://localhost:7219/api/Prestamo/"
  constructor(private httpClient:HttpClient) { }

  getPrestamos():Observable<Prestamo[]>{
    return this.httpClient.get<Prestamo[]>(this.url + "GetPrestamo")
  }

  getPrestamoByIdPrestatario(idPrestatario: number):Observable<Prestamo[]>{
    return this.httpClient.get<Prestamo[]>(this.url + "getPrestamoByIdPrestatario?idPrestatario="+idPrestatario)
  }
  
  getPrestamoByIdPrestamista(idPrestamista: number):Observable<Prestamo[]>{
    return this.httpClient.get<Prestamo[]>(this.url + "getPrestamoByIdPrestamista?idPrestamista="+idPrestamista)
  }
  

  createPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return this.httpClient.post<Prestamo>(this.url + "CrearPrestamo", prestamo);
  }

  updateEstadoPrestamo(nroPrestamo: number, nuevoEstado: string): Observable<Prestamo> {
    return this.httpClient.put<Prestamo>(`${this.url}ActualizarEstadoPrestamo/${nroPrestamo}`, { nuevoEstado });
  }
}
