import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders, HttpParams}from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient:HttpClient,private snackBar : MatSnackBar,private router : Router, ) { }

   //API url
   readonly db_url='http://13.234.194.160:3000/users/';
   options = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};

  getAllUsers() : any{
    return this.httpclient.get(this.db_url);
  }

  deleteUser(id : string) : any{
    return this.httpclient.delete(`${this.db_url+'delete/'+id}`);
  }

  updateUser(user : any,id : string) : any{
    return this.httpclient.put(`${this.db_url+'update/'+id}`,user);
  }

  updateTokens(user : any,id : string) : any{
    return this.httpclient.put(`${this.db_url+'refresh/'+id}`,user);
  }

  getProgradCount() : any{
    return this.httpclient.get(this.db_url + 'prograd/count');
  }

  getMentorCount() : any{
    return this.httpclient.get(this.db_url + 'mentor/count');
  }

  getSquadCount() : any{
    return this.httpclient.get(this.db_url + 'squad/count');
  }

  refreshToken(refresh_token : any) : any{
    const body = new HttpParams()
      .set(`client_id`, '2NZdHKMOqlZfBvHHnzMEku51')
      .set(`client_secret`, 'sec_bZsFsM7kUztzsHIle4oN1Sub0yEgDk9Ai3x01zNxQWYflaFuCGfWj5jXJZ6CWkoBSOwoiRetJEoaPj0o')
      .set(`redirect_uri`, 'http://reportmanager.tk/wakatime/authroize.php')
      .set(`grant_type`, 'refresh_token')
      .set(`refresh_token`, refresh_token);

      const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
   
    this.httpclient.post("https://wakatime.com/oauth/token", body.toString(), { headers, observe: 'response' }).subscribe((data : any)=>{
        this.updateTokens(data.body,data.body.uid).subscribe((res) =>{
          if(res.status == 'ok'){
            this.snackBar.open(" Token refreshed successfully","X", {
              duration: 1000, verticalPosition : "top"
            });
          }
          else{
            this.snackBar.open("Error while refreshing token ","X", {
              duration: 1000, verticalPosition : "top"
            });
          }
      });
    })
  }
}
