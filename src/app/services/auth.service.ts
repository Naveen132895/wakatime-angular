import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Users: any = [
    {username : 'admin@prograd.in',password : 'Admin@123',name : 'Admin'},
    {username : 'naveen@prograd.in',password : 'Naveen@123',name : 'Veeranaveen'},
    {username : 'prasanth@prograd.in',password : 'Prasanth@123',name : 'Prasanth'},
    {username : 'venkatesh@prograd.in',password : 'Venkatesh@123',name : 'Venkatesh'},
    {username : 'anton@prograd.in',password : 'Anton@123',name : 'Anton'},
    {username : 'rabina@prograd.in',password : 'Rabina@123',name : 'Rabina'},
    {username : 'bhuvana@prograd.in',password : 'Bhuvana@123',name : 'Bhuvana'}
  ];
  constructor() { }

  login(username : string,password : string) : any {
    let result = null;
    for(let i=0;i<this.Users.length;i++){
      if(this.Users[i].username == username && this.Users[i].password == password){
        sessionStorage.setItem('isLoggedIn','true');
        sessionStorage.setItem('name',this.Users[i].name);
        result = true;
        break;
        }
      else
        result = false;
    }
    return result;
  }

  logout() : any {
    sessionStorage.clear();
    return true;
  }
}
