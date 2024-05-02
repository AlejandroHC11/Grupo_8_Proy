import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-jefeprestamista',
  templateUrl: './jefeprestamista.component.html',
  styleUrls: ['./jefeprestamista.component.css']
})
export class JefeprestamistaComponent implements OnInit {
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
  //  this.userStore.getIdFromStore()
  //  .subscribe(val => {
  //   const primaryidFromToken = this.auth.getIdFromToker();
  //   this.primarysid = val || primaryidFromToken;
  //  })
}
  Logout(){
    this.auth.signOut();
  }
}