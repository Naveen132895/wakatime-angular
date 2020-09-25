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

  progradCount : any;
  mentorCount : any;
  squadCount : any;

  allUsers : any;

  allUserData : any=[];

  ngOnInit(): void {
    if(sessionStorage.getItem('isLoggedIn') != 'true'){
      this.router.navigate(["login"]);
    }
    else{
      this.getAllUser();
      this.getProgradCount();
      this.getMentorCount();
      this.getSquadCount();
    }
  }

  getAllUser() : any {
    this.userService.getAllUsers().subscribe((data)=>{
      this.allUsers = data;
      console.log(this.allUsers);
      this.getTopper();
    });
  }

  getProgradCount() : any{
    this.userService.getProgradCount().subscribe((data) => {
      this.progradCount = data[0]['count(*)'];
    });
  }

  getMentorCount() : any{
    this.userService.getMentorCount().subscribe((data) => {
      this.mentorCount = data[0]['count(*)'];
    });
  }

  getSquadCount() : any{
    this.userService.getSquadCount().subscribe((data) => {
      this.squadCount = data[0]['count( DISTINCT squad )'];
    });
  }

  getTopper() : any{
    this.allUsers.forEach(element => {
      this.wakatimeService.getStatus(element.uid,element.access_token).subscribe((data)=>{
        this.allUserData.push(data['data']);
      },(err)=>{console.log("Error While retriving Data")},()=>{this.allUserData.sort(this.getSorted);});
    });
  }

  getSorted(a : any,b : any) : any{
    const bandA = a.total_seconds;
    const bandB = b.total_seconds;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = -1;
    } else if (bandA < bandB) {
      comparison = 1;
    }
    return comparison;
  }
}
