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
  constructor(private prestamoService:PrestamoService, private auth: AuthService, private userStore: UserStoreService){
    this.prestamoService.getPrestamos().subscribe(res=>{
      this.prestamos=res
    })
  }
  ngOnInit(){
   
   this.userStore.getFullNameFromStore()
   .subscribe(val=>{
    let fullNameFromToken = this.auth.getfullNameFromToker();
    this.fullName = val || fullNameFromToken
   }) 
}
}
