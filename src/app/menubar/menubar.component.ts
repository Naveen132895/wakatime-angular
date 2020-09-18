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

  ngOnInit(): void {

  }

  logout() : any {
    let result = confirm("Do you want to leave?");
    if(result){
      let status = this.auth.logout();
      if(status == true){
        window.location.assign("http://localhost:4200/");
      }
    }
  }
}