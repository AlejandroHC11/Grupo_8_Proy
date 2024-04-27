import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrlUser: string = "https://localhost:7219/api/User/"
  private baseUrlJefePrestamista: string = "https://localhost:7219/api/JefePrestamista/"
  private baseUrlPrestamista: string = "https://localhost:7219/api/Prestamista/"



  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(this.baseUrlUser);
  }
  getPrestamistas() {
    return this.http.get<any>(this.baseUrlJefePrestamista);
  }
  getPrestatarios() {
    return this.http.get<any>(this.baseUrlPrestamista);
  }
  

}
