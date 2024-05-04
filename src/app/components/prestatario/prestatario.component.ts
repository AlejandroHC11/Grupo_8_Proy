import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-prestatario',
  templateUrl: './prestatario.component.html',
  styleUrls: ['./prestatario.component.css']
})
export class PrestatarioComponent implements OnInit {

  public users:any = [];
  public role!:string;
  public fullName :  string = "";
  public creatorUser :  string = "";
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
  
   // Cargar el idUser desde el LocalStorage y asignarlo al formulario
  const idUser = this.userStore.getIdUserFromStore();
  if (idUser) {
      this.creatorUser = idUser;
  }
}
  Logout(){
    this.auth.signOut();
  }
}
