import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  public users: any = [];
  constructor(private api : ApiService, private auth: AuthService) {}

  ngOnInit(){
      this.api.getUsers()
      .subscribe(
        res => this.users = res,
        err => console.error(err)
      )
  }

  Logout(){
    this.auth.signOut();
  }
}
