import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-solid fa-eye-slash";
  loginForm! : FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-solid fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  //onSubmit()
  onLogin(){
    if(this.loginForm.valid){

      console.log(this.loginForm.value);
      //Send the obj to databse
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res) =>{
         // console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          this.toastr.success("SUCCESS",'Bienvenido')
          this.router.navigate(['dashboard'])
        },
        error:(err)=>{
        this.toastr.success("ERROR",'Acces Denied');
          console.log(err);
        }
      })

    }else{
      //throw the error using toaster and with required fields
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid")
    }
  }

   
}
