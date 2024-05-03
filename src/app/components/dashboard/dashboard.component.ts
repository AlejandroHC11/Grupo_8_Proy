import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  public users:any = [];
  public role!:string;
  public fullName :  string = "";
  public primarySid :  string = "";
  constructor(private api : ApiService, private auth: AuthService, private userStore: UserStoreService) {}

  ngOnInit(){
    interface UserProfile {
      fullName: string;
      // Añade otras propiedades necesarias
    }
      this.api.getUsers()
      .subscribe((res: any)=>{
        this.users = res;
      });

     this.userStore.getFullNameFromStore()
     .subscribe((val: any) =>{
      const fullNameFromToken = this.auth.getfullNameFromToker();
      this.fullName = val || fullNameFromToken
     }) 

     this.userStore.getRoleFromStore()
     .subscribe((val: any) => {
      const roleFromToken = this.auth.getRolFromToker();
      this.role = val || roleFromToken;
     })
     const idUser = this.userStore.getIdUserFromStore();
     if (idUser){
      this.primarySid = idUser;
     }
     
  }

 

  Logout(){
    this.auth.signOut();
  }
  editUser(user: any) {
    // Lógica para editar el usuario
    console.log('Editar usuario', user);
  }

  deleteUser(user: any) {
    // Lógica para eliminar el usuario
    console.log('Eliminar usuario', user);
  }
}
