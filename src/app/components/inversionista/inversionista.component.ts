import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-inversionista',
  templateUrl: './inversionista.component.html',
  styleUrls: ['./inversionista.component.css']
})
export class InversionistaComponent implements OnInit{

  public mostrarDiv = false;
  public users:any = [];
  public role!:string;
  public fullName :  string = "";
  public primarysid :  string = "";
  constructor(private api : ApiService,private auth: AuthService ,private userStore: UserStoreService) {}
  ngOnInit(){
    this.api.getUsers()
    .subscribe(res=>{
      this.users = res;
    });

   this.userStore.getFullNameFromStore()
   .subscribe(val=>{
    const fullNameFromToken = this.auth.getfullNameFromToker();
    this.fullName = val || fullNameFromToken
   }) 

   this.userStore.getRoleFromStore()
   .subscribe(val => {
    const roleFromToken = this.auth.getRolFromToker();
    this.role = val || roleFromToken;
   })
   const primarysid = this.auth.getIdFromLocalStorage()
 
}
  Logout(){
    this.auth.signOut();
  }

}
