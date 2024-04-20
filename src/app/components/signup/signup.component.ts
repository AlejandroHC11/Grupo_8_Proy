import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-solid fa-eye-slash";
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['',Validators.required],
      email:    ['',Validators.required],
      password: ['',Validators.required],
    })
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
          this.signUpForm.reset();
          this.router.navigate(['login']);
        })
        ,error:(err=>{
          alert(err?.error.message)
        })
      })
      

    }else{
      this.validateAllFormFields(this.signUpForm)
      alert("Your form is invalid")
    }
  }

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }

}
