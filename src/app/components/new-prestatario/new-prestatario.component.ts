import { Component } from '@angular/core';
import { Prestatario } from 'src/app/models/prestatario/prestatario';
import { PrestatarioService } from 'src/app/services/prestatario.service';

import { AuthService } from 'src/app/services/services/auth.service';


@Component({
  selector: 'app-new-prestatario',
  templateUrl: './new-prestatario.component.html',
  styleUrls: ['./new-prestatario.component.css']
})
export class NewPrestatarioComponent {
  firstName!: String
  lastName!: String
  dni!: String
  username!: String
  password!: String
  email!: String
  sede!: String


  constructor(private auth: AuthService, private prestatarioService:PrestatarioService){}
  
  getData(){
    if(this.firstName == '' || this.lastName=='' || this.dni == '' || this.username== '' || this.password== '' || this.email=='' || this.sede==''){
      alert('No se ingresaron todos los datos')
      return false
    }
    
    var user = {'firstName': this.firstName, 'lastName':this.lastName, 'dni':this.dni, 'username':this.username, 'password':this.password, 'email':this.email}
    
    this.auth.signUp(user)
    .subscribe({
      next:((res: { idUser: any; })=>{
        const idUser = res.idUser;
        var prestatario: Prestatario = {'sede':this.sede,'telefono':null,'idUser':idUser}
        this.prestatarioService.createPrestatario(prestatario)
        .subscribe({
          error:((err: any)=>{
            console.log("Error en crear Prestatario")
          })
        })
      })
    })
  }
}