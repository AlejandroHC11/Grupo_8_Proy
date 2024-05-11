import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/services/auth.service';
import { PrestatarioService } from '../../services/prestatario.service';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from 'src/app/services/user-store.service';
import { first } from 'rxjs';
import { SedeService } from 'src/app/services/sede.service';
import { PrestamistaService } from 'src/app/services/prestamista.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  sedes: any[] = [];
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-solid fa-eye-slash";
  signUpForm!: FormGroup;
  public creatorUser :  string = "";
  public prestamistas:any = [];
  public idPrestamista:any = [];
  

  constructor(private prestamistaService: PrestamistaService, private fb: FormBuilder, private auth: AuthService, private sedeService: SedeService, private prestatarioService: PrestatarioService, private router: Router,private toastr: ToastrService,private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName:['',Validators.required],
      lastName: ['',Validators.required],
      dni: ['',Validators.required],
      direccion: ['',Validators.required],
      idSede: ['',Validators.required],
      email:    ['',Validators.required],  
      userName: ['',Validators.required], 
      password: ['',Validators.required],
      creatorUser: [''],
    })

    this.sedeService.getSedes()
      .subscribe(res=>{
        this.sedes = res;
    });
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-solid fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSingup(){
    if(this.signUpForm.valid){

      this.prestamistaService.getPrestamistaByIdSede(this.signUpForm.value.idSede)
      .subscribe({
        next:(res=>{
          if (res.length === 0) {
            this.prestamistas = null
            this.toastr.warning("ERROR",'There are not prestamistas to assign');
          }else{
            this.prestamistas = res;

            this.prestamistas.forEach((prestamista: any) => {
              this.idPrestamista.push(prestamista.idPrestamista)
            });
            const randomPrestamistaId = this.idPrestamista[Math.floor(Math.random() * this.idPrestamista.length)];
            const userData = {
              userName: this.signUpForm.value.userName,
              password: this.signUpForm.value.password,
              firstName: this.signUpForm.value.firstName,
              lastName: this.signUpForm.value.lastName,
              email: this.signUpForm.value.email,
              role: "Prestatario",
              creatorUser: randomPrestamistaId.toString()
            }

            this.auth.signUp(userData)
            .subscribe({
              next:(res=>{

                const idCreatedUser = res.idUser

                const prestatarioData = {
                  idSede: this.signUpForm.value.idSede,
                  dni: this.signUpForm.value.dni,
                  direccion: this.signUpForm.value.direccion,
                  idUser: idCreatedUser
                }

                this.prestatarioService.createPrestatario(prestatarioData)
                .subscribe({
                  next:(res=>{
                })
                })
          
                alert(res.message);
                this.signUpForm.reset();
                this.router.navigate(['login']);
              })
              ,error:(err=>{
                alert(err?.error.message)
                this.toastr.warning("Register Failed", 'ERROR');
              })
      })
          }       
      })
      })
    }else{
      ValidateForm.validateAllFormFields(this.signUpForm)
      this.toastr.warning("ERROR",'Login Failed');
    }
  }

  

}

