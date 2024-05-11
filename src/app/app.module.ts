import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PrestatarioComponent } from './components/prestatario/prestatario.component';
import { SignupComponent } from './components/signup/signup.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { EmptyComponent } from './components/empty/empty.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SignUpFormComponent } from './shared/sign-up-form/sign-up-form.component';
import { DashboardRigthComponent } from './components/dashboard-rigth/dashboard-rigth.component';
import { JefeprestamistaComponent } from './components/jefeprestamista/jefeprestamista.component';
import { PrestamistaComponent } from './components/prestamista/prestamista.component';
import { UserComponent } from './components/user/user.component';
import { PrestamoComponent } from './components/prestamo/prestamo.component';
import { MiTablaComponent } from './components/mi-tabla/mi-tabla.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { VerSolicitudComponent } from './solicitudes/ver-solicitud/ver-solicitud.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrestatarioComponent,
    SignupComponent,
    PrestamosComponent,
    EmptyComponent,
    DashboardComponent,
    SignUpFormComponent,
    DashboardRigthComponent,
    JefeprestamistaComponent,
    PrestamistaComponent,
    UserComponent,
    PrestamoComponent,
    MiTablaComponent,
    SolicitudesComponent,
    VerSolicitudComponent,   
  ],
  imports: [
    BrowserAnimationsModule, 
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    SocialLoginModule,   
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'login',component:LoginComponent},
      {path:'signup',component:SignupComponent},
      {path:'user',component:UserComponent, children: [
        { path: '', component: EmptyComponent },
        { path: 'dashboard-rigth', component: DashboardRigthComponent },
        { path: 'sign-up-form', component: SignUpFormComponent }
      ]},
      {path:'jefeprestamista',component:JefeprestamistaComponent, children: [
        { path: '', component: EmptyComponent },
        { path: 'dashboard-rigth', component: DashboardRigthComponent },
        { path: 'sign-up-form', component: SignUpFormComponent }
      ]},
      {path:'prestamista',component:PrestamistaComponent, children: [
        { path: '', component: EmptyComponent },
        { path: 'dashboard-rigth', component: DashboardRigthComponent },
        { path: 'sign-up-form', component: SignUpFormComponent },
      ]},
      {path:'prestatario',component:PrestatarioComponent, children: [
        { path: '', component: EmptyComponent },
        { path: 'dashboard-rigth', component: DashboardRigthComponent },
        { path: 'sign-up-form', component: SignUpFormComponent }
      ]},
      {path:'prestamo',component:PrestamoComponent, children: [
        { path: '', component: EmptyComponent },
        { path: 'prestamos', component: PrestamosComponent },
        { path: 'mi-tabla', component: MiTablaComponent },
        { path: 'solicitudes', component: SolicitudesComponent,children:[
          {path: 'ver-solicitud', component: VerSolicitudComponent}
        ]}
      ]},
      {path:'dashboard',component:DashboardComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: 'login', pathMatch: 'full'}
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,  // True si quieres que intente un inicio de sesión automático al cargar
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('68021170649-hg2mlmjeo7mtkgu0ui73594gjpt341io.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
