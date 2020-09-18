import {Component, OnInit} from '@angular/core';
import{WakatimeService} from "../services/wakatime.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers :[WakatimeService]
})
export class ReportComponent implements OnInit {

  constructor(private wakatimeService :WakatimeService, private router: Router) { }

  //store all values form db
  userList : any[];
  selectedSquad :number = 0;
  totalSquad : any =[];
  selected : any[] = [];
  searchText : string;

  ngOnInit(): void {
    if(sessionStorage.getItem('isLoggedIn') != 'true'){
      this.router.navigate(["login"]);
    }else{
      this.loadData(); 
    }    
  }

  // Loading initial data
  loadData(){
    let tempSquad : any[]=[];
    this.wakatimeService.getuserList().subscribe((res)=>{
      this.userList=res as any[];
      this.userList.forEach((data) => {
        tempSquad.push(data.squad);
      });
      let set = new Set(this.reverse(tempSquad));
      set.forEach(res => {
        this.totalSquad.push({res});
      });
    });
  }

  //Navigation
  getSquad(id :number) : any{
    this.router.navigate(["squad/"+id]);
  }

  reverse(temp : any) : any{
    temp.sort(); 
    temp.reverse();
    return temp;
  }
}