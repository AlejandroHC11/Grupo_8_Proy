import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateform';
import { InversionistaService } from 'src/app/services/inversionista.service';
import { JefePrestamistaService } from 'src/app/services/jefe-prestamista.service';
import { PrestamistaService } from 'src/app/services/prestamista.service';
import { PrestatarioService } from 'src/app/services/prestatario.service';
import { SedeService } from 'src/app/services/sede.service';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent  implements OnInit {

  sedes: any[] = [];
  role!: String
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-solid fa-eye-slash";
  selectedRole: string = '';
  signUpFormComponent!: FormGroup;
  public roleMostrar!:string;
  public fullName :  string = "";
  public creatorUser :  string = "";
  public mostrarDiv = false;
  opcionesDeRoles: any[] = [];
  destinatedRole!: String | null

  constructor(private sedeService: SedeService, private prestatarioService: PrestatarioService, private prestamistaService: PrestamistaService, private jefePrestamistaService: JefePrestamistaService, private inversionistaService: InversionistaService, private fb: FormBuilder, private auth: AuthService, private router: Router,private toastr: ToastrService,private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.signUpFormComponent = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['',Validators.required],
      email:    ['',Validators.required],
      dni: ['',Validators.required],
      role: [''],
      password: ['',Validators.required],
      idSede: ['',Validators.required],
      direccion: ['',Validators.required],
      creatorUser: [''],  // Inicializado pero sin validadores si no es necesario
    });

    this.sedeService.getSedes()
      .subscribe(res=>{
        this.sedes = res;
    });

     // Cargar el idUser desde el LocalStorage y asignarlo al formulario
     const idUser = this.userStore.getIdUserFromStore();
     if (idUser) {
        this.creatorUser = idUser;
       this.signUpFormComponent.patchValue({
        creatorUser: idUser  // Asigna el valor de idUser al campo creatorUser del formulario
       });
     }

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
     const fullNameFromToken = this.auth.getfullNameFromToker();
     this.fullName = val || fullNameFromToken
    }) 
 
    this.userStore.getRoleFromStore()
    .subscribe(val => {
      const roleFromToken = this.auth.getRolFromToker();
      this.roleMostrar = val || roleFromToken;

      if(this.roleMostrar == "Prestamista"){
        this.destinatedRole = "Prestatario"
      } else if(this.roleMostrar == "Jefe Prestamista"){
        this.destinatedRole = "Prestamista"
      } else if(this.roleMostrar == "Inversionista"){
        this.destinatedRole = "Jefe Prestamista"
      } else if(this.roleMostrar == "Admin"){
        this.signUpFormComponent.get('role')?.setValidators(Validators.required);
        this.signUpFormComponent.get('role')?.updateValueAndValidity();
      }else{
        this.destinatedRole = null
      }
    });

  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-solid fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onRoleSelected() {
    this.destinatedRole = this.signUpFormComponent.get('role')?.value;
  }
  onSingup(){
    if(this.signUpFormComponent.valid && this.destinatedRole){
      console.log("Rol a registrar:", this.destinatedRole);
      const userData = {
        userName: this.signUpFormComponent.value.userName,
        password: this.signUpFormComponent.value.password,
        firstName: this.signUpFormComponent.value.firstName,
        lastName: this.signUpFormComponent.value.lastName,
        email: this.signUpFormComponent.value.email,
        role: this.destinatedRole,
        creatorUser: this.creatorUser
      }

      this.auth.signUp(userData)
      .subscribe({
        next:(res=>{

          const idCreatedUser = res.idUser

          const staffData = {
            idSede: this.signUpFormComponent.value.idSede,
            dni: this.signUpFormComponent.value.dni,
            direccion: this.signUpFormComponent.value.direccion,
            idUser: idCreatedUser
          }

          if(this.destinatedRole == "Prestatario") {
            this.prestatarioService.createPrestatario(staffData)
            .subscribe({
              next:(res=>{
              })
            })
          }else if(this.destinatedRole == "Prestamista"){
            this.prestamistaService.createPrestamista(staffData)
            .subscribe({
              next:(res=>{
              })
            })
          }else if(this.destinatedRole == "Jefe Prestamista"){
            this.jefePrestamistaService.createJefePrestamista(staffData)
            .subscribe({
              next:(res=>{
              })
            })
          }else if(this.destinatedRole == "Inversionista"){
            this.inversionistaService.createInversionista(staffData)
            .subscribe({
              next:(res=>{
              })
            })
          }

          alert(res.message);
          this.signUpFormComponent.reset();
          this.toastr.success("Registro Correcto", 'SUCESS');
        })
        ,error:(err=>{
          const errorMessage = err?.error?.message || "Ha ocurrido un error desconocido";
          alert(errorMessage);
          console.log(err)
          this.toastr.error("Register Failed", 'ERROR');
        })
      })
      

    }else{
      ValidateForm.validateAllFormFields(this.signUpFormComponent)
      this.toastr.warning("ERROR",'Validated Error');
    }
  }
}
