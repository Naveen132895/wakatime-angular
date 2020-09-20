import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient:HttpClient) { }

   //API url
   readonly db_url='http://13.234.194.160:3000/users/';

   deleteUser(id : string) : any{
    return this.httpclient.delete(`${this.db_url+'delete/'+id}`);
   }

   updateUser(user : any,id : string) : any{
     return this.httpclient.put(`${this.db_url+'update/'+id}`,user);
   }

   getAll() : any{
    return this.httpclient.get(this.db_url);
   }
}
