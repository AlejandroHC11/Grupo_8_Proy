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
}