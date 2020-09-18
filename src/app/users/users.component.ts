import {Component, AfterViewInit, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import{Wakatime} from "../wakatime";
import{WakatimeService} from "../services/wakatime.service";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  wakatime : Observable<Wakatime[]>;
  displayedColumns: string[] = ['name', 'squad', 'uid'];
  dataSource : any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private wakatimeService :WakatimeService, private router : Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('isLoggedIn') != 'true'){
      this.router.navigate(["login"]);
    }
  }

  ngAfterViewInit() : void{
    this.wakatimeService.getuserList().subscribe((res)=>{
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue : string){
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getOverAllTime(uid : string,token : string) : any {
      this.wakatimeService.getOverAll(uid,token).subscribe((data)=>{
        return data['data'].text;
      });
  }

  edit(element : any){
    console.log(element)
  }
  delete(element : any){
    console.log(element)
  }
  refresh(element : any){
    console.log(element)
  }
}
