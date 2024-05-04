import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  url:string = "https://localhost:7219/api/Sede/"
  constructor(private httpClient:HttpClient) { }

  getSedes() {
    return this.httpClient.get<any>(this.url+"GetSede");
  }
  getSedeById(idSede: number) {
    return this.httpClient.get<any>(this.url+"getSedeById?idSede="+idSede);
  }
}
