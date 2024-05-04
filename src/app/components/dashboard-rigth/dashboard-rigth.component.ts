import { Component, OnInit } from '@angular/core';
import { JefePrestamistaService } from 'src/app/services/jefe-prestamista.service';
import { PrestamistaService } from 'src/app/services/prestamista.service';
import { PrestatarioService } from 'src/app/services/prestatario.service';
import { SedeService } from 'src/app/services/sede.service';
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
  public jefesprestamista:any = [];
  public users1:any = [];
  public users2:any = [];
  public sedes:any = [];
  public role!:string;
  public fullName :  string = "";
  public creatorUser :  string = "";
  constructor(private sedeService : SedeService, private prestatarioService : PrestatarioService, private prestamistaService : PrestamistaService, private jefePrestamistaService: JefePrestamistaService, private api: ApiService, private auth: AuthService ,private userStore: UserStoreService) {}

  ngOnInit(){
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

   if(this.role=="Admin"){
    this.api.getUsers()
    .subscribe(res=>{
      this.users1 = res;
    });
   }else if(this.role=="Inversionista"){
    this.jefePrestamistaService.getJefePrestamistaByCreatorUser(this.creatorUser)
      .subscribe(res=>{
        this.jefesprestamista = res;
        this.jefesprestamista.forEach((jefesprestamista: any) => {
          this.api.getUserById(jefesprestamista.idUser).subscribe(res => {
            this.users2.push(res);
          })
          this.sedeService.getSedeById(jefesprestamista.idSede).subscribe(res => {
            this.sedes.push(res);
          })
        })
    });
   }else if(this.role=="Jefe Prestamista"){
    this.prestamistaService.getPrestamistaByCreatorUser(this.creatorUser)
      .subscribe(res=>{
        this.prestamistas = res;
        this.prestamistas.forEach((prestamista: any) => {
          this.api.getUserById(prestamista.idUser).subscribe(res => {
            this.users2.push(res);
          })
          this.sedeService.getSedeById(prestamista.idSede).subscribe(res => {
            this.sedes.push(res);
          })
        })
    });
   }if(this.role=="Prestamista"){
    this.prestatarioService.getPrestatarioByCreatorUser(this.creatorUser)
      .subscribe(res=>{
        this.prestatarios = res;
        this.prestatarios.forEach((prestatario: any) => {
          this.api.getUserById(prestatario.idUser).subscribe(res => {
            this.users2.push(res);
          })
          this.sedeService.getSedeById(prestatario.idSede).subscribe(res => {
            this.sedes.push(res);
          })
        })

    });
   }  
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
