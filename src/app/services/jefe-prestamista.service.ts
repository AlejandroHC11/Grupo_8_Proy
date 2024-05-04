import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JefePrestamista } from '../models/jefePrestamista/jefe-prestamista';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JefePrestamistaService {

  url:string = "https://localhost:7219/api/JefePrestamista/"
  constructor(private httpClient:HttpClient) { }

  createJefePrestamista(jefePrestamista: JefePrestamista): Observable<JefePrestamista> {
    return this.httpClient.post<JefePrestamista>(this.url + "CrearJefePrestamista", jefePrestamista);
  }
  getJefePrestamista() {
    return this.httpClient.get<any>(this.url+"GetJefePrestamista");
  }
  getJefePrestamistaByCreatorUser(creatorUser: string) {
    return this.httpClient.get<any>(this.url+"getJefePrestamistaByCreatorUser?creatorUser="+creatorUser);
  }
}
