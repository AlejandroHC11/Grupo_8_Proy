import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent  implements OnInit {

  sede!: String
  role!: String
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-solid fa-eye-slash";
  signUpFormComponent!: FormGroup;
  public roleMostrar!:string;
  public fullName :  string = "";
  public primarySid :  string = "";
  public mostrarDiv = false;
  opcionesDeRoles: any[] = [];

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,private toastr: ToastrService,private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.signUpFormComponent = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['',Validators.required],
      email:    ['',Validators.required],
      dni: ['',Validators.required],
      password: ['',Validators.required],
      role: ['',Validators.required],
      sede: ['',Validators.required],
      direccion: ['',Validators.required],
      primarySid: [''],  // Inicializado pero sin validadores si no es necesario
    });
     // Cargar el idUser desde el LocalStorage y asignarlo al formulario
     const idUser = this.userStore.getIdUserFromStore();
     if (idUser) {
        this.primarySid = idUser;
       this.signUpFormComponent.patchValue({
         primarySid: idUser  // Asigna el valor de idUser al campo primarySid del formulario
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
    })

    // this.userStore.getIdFromStore()
    // .subscribe(val => {
    //  const primaryidFromToken = this.auth.getIdFromToker();
    //  this.primarySid = val || primaryidFromToken;
    //  this.signUpFormComponent.patchValue({
    //   primarySid: this.primarySid  // Asigna el valor de primarysid al form
    //   });
    // })


    this.inicializarRoles();
  }
  inicializarRoles() {
    this.userStore.getRoleFromStore().subscribe(val => {
      const roleFromToken = this.auth.getRolFromToker();
      this.roleMostrar = val || roleFromToken;

      // Definir qué roles se deben mostrar basado en el rol del usuario
      this.opcionesDeRoles = [
        { valor: 'Inversionista', mostrar: this.roleMostrar === 'Admin' || this.roleMostrar === 'Inversionista' },
        { valor: 'JefePrestamista', mostrar: this.roleMostrar === 'Admin' || this.roleMostrar === 'Inversionista'},
        { valor: 'Prestamista', mostrar: this.roleMostrar === 'Admin' || this.roleMostrar === 'Inversionista' || this.roleMostrar === 'JefePrestamista'},
        { valor: 'Prestatario', mostrar: true }
      ];
    });
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-solid fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onSingup(){
    if(this.signUpFormComponent.valid){

      this.auth.signUp(this.signUpFormComponent.value)
      .subscribe({
        next:(res=>{
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
