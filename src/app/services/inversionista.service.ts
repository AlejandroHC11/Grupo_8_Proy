import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InversionistaService {

  private baseUrl: string = "https://localhost:7219/api/User/";

  constructor(private http: HttpClient, private router: Router) { }
}
