import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  constructor(private auth : AuthService,private router: Router) { }

  name : string;
  ngOnInit(): void {
    this.name=sessionStorage.getItem("name");
    console.log(this.name)
  }

  logout() : any {
    let result = confirm("Hey "+this.name+", Wanna Logout?");
    if(result){
      let status = this.auth.logout();
      if(status == true){
        window.location.assign("http://localhost:4200/");
      }
    }
  }
}