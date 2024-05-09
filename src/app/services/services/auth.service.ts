import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JitEvaluator } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7219/api/User/"
  private userPayload:any;

  constructor(private http: HttpClient, private router: Router) { 
    this.userPayload = this.decodedToker(); 
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`,userObj)
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken (tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }
  // NUEVA FORMA DE LLAMAR EL ID Y EL NOMBRE
  storeIdUser (id: any) {
    localStorage.setItem('idUser', id)
  }
 storeNameUser (nombre: string) {
  localStorage.setItem('nombre', nombre)
  }
 storeCreatorUser (creatorUser: any){
  localStorage.setItem('creatorUser',creatorUser)
 }
  //


  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  decodedToker(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToker(){
    if(this.userPayload)
      return this.userPayload.name;
  }
  getRolFromToker(){
    if(this.userPayload)
      return this.userPayload.role;
  }
  //metodo que obtiene el IdUser del Local Storage
  getIdFromLocalStorage(){
    return localStorage.getItem('idUser')
  }
  getNameFromLocalStorage(){
    return localStorage.getItem('nombre')
  }
  getCreatorUserFromLocalStorage(){
    return localStorage.getItem('creatorUser')
  }

}
