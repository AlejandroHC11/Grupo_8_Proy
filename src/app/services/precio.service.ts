import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrecioService {

  url:string = "https://localhost:7219/api/Precio/"
  constructor(private httpClient:HttpClient) { }

  getPrecio() {
    return this.httpClient.get<any>(this.url+"GetPrecio");
  }
}
