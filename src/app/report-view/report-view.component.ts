import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';

import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { WakatimeService } from '../services/wakatime.service';
import {ExcelService} from '../services/excel.service';


@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['Projects','Date','Start', 'Duration'];
  dataSource : any;

  private uid : string ;
  selectedUser : any;
  overAllStats : any;
  date : string;
  fromDate : string;
  toDate : string;
  localTime : any;
  dailyReports : any;

  nodata : boolean;
  norange : boolean;

  report : any;
  dailyLog : any;

  //scheduled report
  range : string ="";

  ranges : any[] = [
    {name : "Past 7 Days",value : "last_7_days"}, 
    {name : "Past 30 Days",value : "last_30_days"}, 
    {name : "Past 6 Months",value : "last_6_months"}, 
    {name : "Past 12 Months",value : "last_year"}
  ]

  best_day : any = [];
  all_data : any;

  public languageName : Label[] = [];
  public languageTime : SingleDataSet =[];
  public polarAreaChartType: ChartType = 'polarArea';

  public workingProjectTitle : Label[] = [];
  public WorkingProjectTime : SingleDataSet =[];

  //For charts
  public projectTitle : Label[] = [];
  public projectTime : SingleDataSet =[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public bgColor = [{backgroundColor: 
    ["#FA8484", "#FAA484", "#FAC484", "#FAE284", "#FAFA84", "#E1FA84", "#C5FA84", "#84FAE9", "#84F5FA", "#84E5FA",
     "#84CEFA", "#84AEFA", "#849BFA", "#9C84FA", "#B384FA", "#DC84FA", "#F784FA", "#FA84E1", "#FA84B8", "#FA8484",
     "#A56F6F", "#A5846F", "#A5946F", "#85A56F", "#6FA5A3", "#6F93A5", "#756FA5", "#8E6FA5", "#A56F9E", "#A56F79"
    ]}];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  
  constructor(
    private route: ActivatedRoute,
    private wakatimeService : WakatimeService,
    private excelService:ExcelService,
    private location: Location,
    private snackBar: MatSnackBar,
    private router : Router
    ){
      this.route.params.subscribe( params => {this.uid = params.uid} );
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
   }
   
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('isLoggedIn') != 'true'){
      this.router.navigate(["login"]);
    }else{
      this.getUser(this.uid);
    }
  }

  downloadreport() : any{
    this.excelService.exportAsExcelFile(this.report, this.selectedUser.name,'last_7_days');
  }
  downloadLog() : any{
    this.excelService.exportAsExcelFile(this.dailyLog, this.selectedUser.name,'daily_log');
  }

  //fetch user from db
  getUser(id : string) : any{
    this.wakatimeService.geUser(id).subscribe((data : any) => {
      this.selectedUser = data[0];
      this.wakatimeService.getOverAll(this.selectedUser.uid,this.selectedUser.access_token).subscribe((res : any)=>{
        this.overAllStats = res['data'];
        this.getProjects();
      });
    });
  }

  returnTimeLog(str : string): string {
    str = str.substring(11,16);
     return str;
  }

  returnDateLog(temp : string){
    return temp = temp.substring(0,10);
  }

  //bact to previous screen
  back() : any{
    this.location.back();
  }

  //fetch data from api
  getDaily(date : string) : any {
    let currentDate = new Date();
    let dateSent = new Date(date);
    let diff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
    this.nodata = false;
    if(date != null){
      if(diff < 15 && diff > 0){
        this.wakatimeService.getDayWise(this.selectedUser.uid, this.selectedUser.access_token,date).subscribe((data)=>{
          this.dailyReports = new MatTableDataSource(data['data']);
          this.dailyLog = data['data'];
        });
      }else{
        this.nodata = true;
      }  
    }
    else{
      this.snackBar.open("SELECT THE DATE","close", {
        duration: 1000,
        verticalPosition : "top"
      });
    }
  }

  getSheduleReport() : any{

    this.workingProjectTitle = [];
    this.WorkingProjectTime = [];
    this.languageName = [];
    this.languageTime = [];

    if(this.range != ""){
      this.wakatimeService.getScheduleReport(this.selectedUser.uid,this.range,this.selectedUser.access_token).subscribe((data)=>{
        this.best_day = data['data'].best_day;
        this.all_data = data['data'];
        data['data'].languages.forEach(element => {
          this.languageName.push(element.name);
          this.languageTime.push((element.hours * 60) + element.minutes);
        });
        data['data'].projects.forEach(element => {
          this.workingProjectTitle.push(element.name);
          this.WorkingProjectTime.push((element.hours * 60) + element.minutes);
        });
      });
    }
    else{
      this.snackBar.open("SELECT THE RANGE","close", {
        duration: 1000,
        verticalPosition : "top"
      });
    }
  }

  
  getProjects() : any {
    this.wakatimeService.getStatus(this.selectedUser.uid, this.selectedUser.access_token).subscribe(data=>{
      this.report = data['data'].projects.sort(() => Math.random() - 0.5);
      this.report.forEach(element => {
        this.projectTitle.push(element.name);
        this.projectTime.push((element.hours * 60) + element.minutes);
      });
    });
  }


}
