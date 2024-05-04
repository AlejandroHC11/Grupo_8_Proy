import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestamista } from 'src/app/models/prestamista/prestamista';

@Injectable({
  providedIn: 'root'
})
export class PrestamistaService {

  url:string = "https://localhost:7219/api/Prestamista/"
  constructor(private httpClient:HttpClient) { }

  createPrestamista(prestamista: Prestamista): Observable<Prestamista> {
    return this.httpClient.post<Prestamista>(this.url + "CrearPrestamista", prestamista);
  }

  getPrestamistas() {
    return this.httpClient.get<any>(this.url+"GetPrestamista");
  }

  getPrestamistaByCreatorUser(creatorUser: string) {
    return this.httpClient.get<any>(this.url+"getPrestamistaByCreatorUser?creatorUser="+creatorUser);
  }
}
