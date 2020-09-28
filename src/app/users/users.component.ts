import {Component, AfterViewInit, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

import{Wakatime} from "../wakatime";
import{WakatimeService} from "../services/wakatime.service";
import{ UserService } from "../services/user.service";
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  updateValue : any;
  isUpdateOn : boolean = false;
  wakatime : Observable<Wakatime[]>;
  displayedColumns: string[] = ['name', 'squad', 'course', 'actions'];
  dataSource : any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private wakatimeService :WakatimeService,
    private snackBar : MatSnackBar,
    private router : Router, 
    private userService : UserService) { }

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

//Edit User
  edit(element : any){
   this.updateValue = element;
   this.isUpdateOn = true;
  }

//Delete User
  delete(element : any){
    let result = confirm("Do you want to remove " + element.name + "?");
    if(result){
      this.userService.deleteUser(element.uid).subscribe((res)=>{
        if(res.status == 'ok'){
          this.snackBar.open(element.name+" deleted Successfully","X", {
            duration: 1000, verticalPosition : "top"
          });
          setTimeout(() => {  this.router.navigate(['users']); }, 1000);
        }
        else{
          this.snackBar.open("Error while deleting "+element.name,"X", {
            duration: 1000, verticalPosition : "top"
          });
        }
      });
    }
  }

//Refresh User Token
  refresh(element : any){
    let result = confirm("Do you want to refresh the access_token for " + element.name + "?");
    if(result){
      this.userService.refreshToken(element.refresh_token);
    }
  }

  update(){
    this.userService.updateUser(this.updateValue,this.updateValue.uid).subscribe((res)=>{
      if(res.status == 'ok'){
        this.snackBar.open(this.updateValue.name+" details are updated successfully.","X", {
          duration: 1500, verticalPosition : "top"
        });
        this.isUpdateOn = false;
        this.router.navigate(['users']);
      }else{
        this.snackBar.open("Error while updating "+this.updateValue.name + "details","X", {
          duration: 1500, verticalPosition : "top"
        });
        this.isUpdateOn = false;
        this.router.navigate(['users']);
      }
    });
  }

  clear(){
    this.snackBar.open("Update Cancelled","X", {
      duration: 1500, verticalPosition : "top"
    });
    this.isUpdateOn = false;
    this.router.navigate(['users']);
  }
  
}
