import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Inversionista } from '../models/inversionista/inversionista';

@Injectable({
  providedIn: 'root'
})
export class InversionistaService {

  url:string = "https://localhost:7219/api/Inversionista/"
  constructor(private httpClient:HttpClient) { }

  createInversionista(inversionista: Inversionista): Observable<Inversionista> {
    return this.httpClient.post<Inversionista>(this.url + "CrearInversionista", inversionista);
  }
}
