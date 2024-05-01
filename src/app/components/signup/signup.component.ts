import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/services/auth.service';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  sede!: String
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-solid fa-eye-slash";
  signUpForm!: FormGroup;
  public primarySid :  string = "";
  

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,private toastr: ToastrService,private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName:['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['',Validators.required],
      email:    ['',Validators.required],
      dni: ['',Validators.required],
      password: ['',Validators.required],
      sede: ['',Validators.required],
      direccion: ['',Validators.required],
      primarySid: [''], 

    })

    const idUser = this.userStore.getIdUserFromStore();
    if (idUser) {
       this.primarySid = idUser;
      this.signUpForm.patchValue({
        primarySid: idUser  // Asigna el valor de idUser al campo primarySid del formulario
      });
    }
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-solid fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSingup(){
    if(this.signUpForm.valid){

      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          //
          // const idUser = res.idUser;
          // const prestatario: Prestatario = {
          //   "sede": this.signUpForm.value.sede,
          //   "telefono": null,
          //   "idUser": idUser
          //
          this.signUpForm.reset();
          this.router.navigate(['login']);
        })
        ,error:(err=>{
          alert(err?.error.message)
          this.toastr.warning("Register Failed", 'ERROR');
        })
      })
      

    }else{
      ValidateForm.validateAllFormFields(this.signUpForm)
      this.toastr.warning("ERROR",'Login Failed');
    }
  }

  

}

