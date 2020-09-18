import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Users: any = [
    {username : 'admin@prograd.in',password : 'Admin@123'},
    {username : 'naveen@prograd.in',password : 'Naveen@123'},
    {username : 'prasanth@prograd.in',password : 'Prasanth@123'},
    {username : 'venkatesh@prograd.in',password : 'Venkatesh@123'},
    {username : 'Ragavi@prograd.in',password : 'Ragavi@123'},
  ];
  constructor() { }

  login(username : string,password : string) : any {
    console.log(username,password)
    let result = null;
    for(let i=0;i<this.Users.length;i++){
      if(this.Users[i].username == username && this.Users[i].password == password){
        sessionStorage.setItem('isLoggedIn','true');
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
