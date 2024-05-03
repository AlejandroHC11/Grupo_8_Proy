import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard-rigth',
  templateUrl: './dashboard-rigth.component.html',
  styleUrls: ['./dashboard-rigth.component.css']
})
export class DashboardRigthComponent implements OnInit {
  public prestamistas:any = [];
  public prestatarios:any = [];
  public users:any = [];
  public role!:string;
  public fullName :  string = "";
  constructor(private api : ApiService,private auth: AuthService ,private userStore: UserStoreService) {}

  ngOnInit(){
    this.api.getUsers()
    .subscribe((res: any)=>{
      this.users = res;
    });
    this.api.getPrestamistas()
      .subscribe((res: any)=>{
        this.prestamistas = res;
      });
      this.api.getPrestatarios()
      .subscribe((res: any)=>{
        this.prestatarios = res;
      });

   this.userStore.getFullNameFromStore()
   .subscribe((val: any)=>{
    const fullNameFromToken = this.auth.getfullNameFromToker();
    this.fullName = val || fullNameFromToken
   }) 

   this.userStore.getRoleFromStore()
   .subscribe((val: any) => {
    const roleFromToken = this.auth.getRolFromToker();
    this.role = val || roleFromToken;
   })
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
