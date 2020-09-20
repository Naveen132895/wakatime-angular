import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WakatimeService } from '../services/wakatime.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router : Router, private wakatimeService : WakatimeService , private userService : UserService) { }

  allUsers : any;

  ngOnInit(): void {
    if(sessionStorage.getItem('isLoggedIn') != 'true'){
      this.router.navigate(["login"]);
    }
    else{
      this.getAllUsers();
    }
  }

  getAllUsers() : any{
    this.userService.getAll().subscribe((data) => {
      this.allUsers = data;
    });
  }

  
}
