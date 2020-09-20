import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { WakatimeService } from '../services/wakatime.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-squad-view',
  templateUrl: './squad-view.component.html',
  styleUrls: ['./squad-view.component.css']
})
export class SquadViewComponent implements OnInit {

  id : number;
  squadDetails : any[];
  total : any;
  searchText : string;

  constructor(private route: ActivatedRoute,private router: Router,private wakatimeService :WakatimeService,private location: Location) {
    this.route.params.subscribe( params => {this.id = params.id} );
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('isLoggedIn') != 'true'){
      this.router.navigate(["login"]);
    }else{
    this.getSquadDetails(this.id);
    }
  }

  getSquadDetails(id : number) : any{
    this.wakatimeService.getsquad(id).subscribe((data : any) => {
      this.squadDetails = data;
      this.total = this.squadDetails.length
    });
  }

  getReport(uid : string) : any{
    this.router.navigate(["viewReport/"+uid]);
  }

  back() : any{
    this.location.back();
  }
  
}
