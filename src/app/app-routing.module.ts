import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportComponent} from './report/report.component';
import {UsersComponent} from './users/users.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { ReportViewComponent } from './report-view/report-view.component';
import { SquadViewComponent } from './squad-view/squad-view.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [

  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'report', component: ReportComponent },
  { path: 'users', component: UsersComponent },
  { path: 'viewReport/:uid', component: ReportViewComponent },
  { path: 'squad/:id', component: SquadViewComponent },
  {path: 'error', component: NotfoundComponent},
  {path: '**', redirectTo: '/error'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
