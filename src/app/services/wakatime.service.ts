import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WakatimeService {

  //API url
  readonly db_url='http://13.234.194.160:3000/users/';
  readonly base_URL = 'https://wakatime.com/api/v1/users/'

  constructor(private httpclient:HttpClient) { }

  //Accessing DB API
  getuserList() : Observable<any> {
    return this.httpclient.get(`${this.db_url}`);
  }

  getsquad(id : number) : Observable<any> {
    return this.httpclient.get(`${this.db_url+'squad/'+id}`);
  }

  geUser(id : string) : Observable<any> {
    return this.httpclient.get(`${this.db_url+id}`);
  }

  getSquadCount(id : number) : Observable<any> {
    return this.httpclient.get(`${this.db_url+'squad/count/'+id}`);
  }

  //Accessing Wakatime Api
  getLeaderboard() : any {
    return this.httpclient.get('https://wakatime.com/api/v1/leaders');
  }

  getStatus(uid : string, token : string) : any{
    return this.httpclient.get(this.base_URL + uid+'/stats/last_7_days',{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })}
    );
  }

  getOverAll(uid : string, token : string) : any{
    return this.httpclient.get(this.base_URL + uid+'/all_time_since_today',{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })}
    );
  }

  getDayWise(uid : string, token : string, date : string) : any{
    return this.httpclient.get(this.base_URL + uid+'/durations?date=' + date,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })}
    );
  }

  getOverAllSummary(uid : string, token : string, start : string, end : string) : any{
    return this.httpclient.get(this.base_URL + uid+'/summaries?start=' + start + '&end=' + end,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })}
    );
  }

  getScheduleReport(uid : string, range : string, token : string) : any{
    return this.httpclient.get(this.base_URL + uid+'/stats/' + range,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })}
    );
  }

}
