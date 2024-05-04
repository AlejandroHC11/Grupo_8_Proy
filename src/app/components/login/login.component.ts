import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateform';
import { UserStoreService } from 'src/app/services/user-store.service';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

declare let google: any;
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

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router:Router,
    private toastr: ToastrService,
    private userStore: UserStoreService,
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.loadGoogleAPI();
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  loadGoogleAPI() {
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => this.initGoogleButton();
    document.body.appendChild(script);
  }

  initGoogleButton() {
    google.accounts.id.initialize({
      client_id: '68021170649-hg2mlmjeo7mtkgu0ui73594gjpt341io.apps.googleusercontent.com',  // Asegúrate de reemplazar 'TU_CLIENT_ID' con tu Client ID real
      callback: this.onSignIn.bind(this)
    });

    google.accounts.id.renderButton(
      document.getElementById('googleSignInButton'),
      { theme: 'outline', size: 'large' }  // Personaliza según tus necesidades
    );
  }

  onSignIn(googleUser: any) {
    console.log('Google user data:', googleUser);
    this.router.navigate(['/dashboard']);  // Asegúrate de que la ruta es correcta según tu configuración de enrutamiento.


  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      console.log(userData);
      this.determineUserRole(userData.email); // Suponiendo que usas el email para determinar el rol
    }).catch((error) => {
      console.error('Error during Google sign in:', error);
    });
  }
  private determineUserRole(email: string): void {
    // Lógica para determinar el rol basada en el email
    // Esto es solo un ejemplo, podrías tener que hacer una petición a tu backend
    const userRole = 'Prestatario'; // Aquí implementarías la lógica real para obtener el rol
    localStorage.setItem('userRole', userRole); // Almacena el rol en el almacenamiento local
    this.redirectUserBasedOnRole(userRole);
  }
  private redirectUserBasedOnRole(role: string): void {
    if (role === 'Prestatario') {
      this.router.navigate(['/prestamo/']);
    } else {
      // manejo para otros roles
      this.router.navigate(['/login']);
    }
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
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          this.auth.storeIdUser(res.usuario.id);
          const tokernPayload = this.auth.decodedToker();
          this.userStore.setFullNameForStore(tokernPayload.name);
          this.userStore.setRoleForStore(tokernPayload.role);

          this.toastr.success("SUCCESS",'Bienvenido')
          this.router.navigate(['dashboard'])
        },
        error:(err)=>{
        this.toastr.error("ERROR",'Access Denied');
          console.log(err);
        }
      });

    }else{
      //throw the error using toaster and with required fields
      ValidateForm.validateAllFormFields(this.loginForm);
      this.toastr.warning("ERROR",'Login Failed');

    }
  }

   
}
