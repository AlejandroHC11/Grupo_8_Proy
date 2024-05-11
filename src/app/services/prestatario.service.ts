import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestatario } from 'src/app/models/prestatario/prestatario';

@Injectable({
  providedIn: 'root'
})
export class PrestatarioService {

  url:string = "https://localhost:7219/api/Prestatario/"
  constructor(private httpClient:HttpClient) { }

  createPrestatario(prestatario: Prestatario): Observable<Prestatario> {
    return this.httpClient.post<Prestatario>(this.url + "CrearPrestatario", prestatario);
  }

  getPrestatarios() {
    return this.httpClient.get<any>(this.url+"GetPrestatario");
  }

  getPrestatarioByCreatorUser(creatorUser: string) {
    return this.httpClient.get<any>(this.url+"getPrestatarioByCreatorUser?creatorUser="+creatorUser);
  }

  getPrestatarioById(prestatarioId: number) {
    return this.httpClient.get<any>(this.url + "getPrestatarioById?prestatarioId=" + prestatarioId);
  }
}