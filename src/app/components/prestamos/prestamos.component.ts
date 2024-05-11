import { Component, OnInit } from '@angular/core';
import { Prestamo } from 'src/app/models/prestamo/prestamo';
import { PrestamoService } from 'src/app/services/prestamo.service';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit{
  prestamos:Prestamo[]=[]
  public fullName :  string = "";
  public creatorUser :  string = "";
  public role!:string;
  constructor(private prestamoService:PrestamoService, private auth: AuthService, private userStore: UserStoreService){
  }
  ngOnInit(){
   
   this.userStore.getFullNameFromStore()
   .subscribe(val=>{
    let fullNameFromToken = this.auth.getfullNameFromToker();
    this.fullName = val || fullNameFromToken
   }) 
   this.userStore.getRoleFromStore()
   .subscribe(val => {
    const roleFromToken = this.auth.getRolFromToker();
    this.role = val || roleFromToken;
   })
   // Cargar el idUser desde el LocalStorage y asignarlo al formulario
  const idUser = this.userStore.getIdUserFromStore();
  if (idUser) {
      this.creatorUser = idUser;
  }
  
  if(this.role=="Prestatario"){
    this.prestamoService.getPrestamoByIdPrestatario(parseInt(this.creatorUser)).subscribe(res=>{
      this.prestamos=res
    })
  }else if(this.role=="Admin"){
    this.prestamoService.getPrestamos().subscribe(res=>{
      this.prestamos=res
    })
  }   
   
}
}
