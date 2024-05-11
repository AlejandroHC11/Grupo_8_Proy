import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrlUser: string = "https://localhost:7219/api/User/"



  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(this.baseUrlUser);
  }
  getUserById(userId: number) {
    return this.http.get<any>(this.baseUrlUser+"getUserById?userId="+userId);
  }

}
