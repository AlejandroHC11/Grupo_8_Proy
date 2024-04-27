import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PrestatarioComponent } from './components/prestatario/prestatario.component';
import { SignupComponent } from './components/signup/signup.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { NewComponent } from './components/new/new.component';
import { EmptyComponent } from './components/empty/empty.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { InversionistaComponent } from './components/inversionista/inversionista.component';
import { SignUpFormComponent } from './shared/sign-up-form/sign-up-form.component';
import { DashboardRigthComponent } from './components/dashboard-rigth/dashboard-rigth.component';
import { JefeprestamistaComponent } from './components/jefeprestamista/jefeprestamista.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrestatarioComponent,
    SignupComponent,
    PrestamosComponent,
    NewComponent,
    EmptyComponent,
    DashboardComponent,
    InversionistaComponent,
    SignUpFormComponent,
    DashboardRigthComponent,
    JefeprestamistaComponent,
    
  ],
  imports: [
    BrowserAnimationsModule, 
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,   
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'login',component:LoginComponent},
      {path:'signup',component:SignupComponent},
      {path:'inversionista',component:InversionistaComponent, children: [
        { path: '', component: EmptyComponent },
        { path: 'dashboard-rigth', component: DashboardRigthComponent },
        { path: 'sign-up-form', component: SignUpFormComponent }
      ]},
      {path:'jefeprestamista',component:JefeprestamistaComponent, children: [
        { path: '', component: EmptyComponent },
        { path: 'dashboard-rigth', component: DashboardRigthComponent },
        { path: 'sign-up-form', component: SignUpFormComponent }
      ]},
      {path:'dashboard',component:DashboardComponent, canActivate: [AuthGuard]},
      {path:'prestatario',component:PrestatarioComponent, children: [
        { path: '', component: EmptyComponent },
        { path: 'prestamos', component: PrestamosComponent },
        { path: 'new', component: NewComponent }
      ]},
      {path: '**', redirectTo: 'login', pathMatch: 'full'}
    ])
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
