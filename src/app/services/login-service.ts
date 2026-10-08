import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../Model/loginRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  ApiURL = "http://localhost:8080"; 

   constructor(private http: HttpClient, private router :Router) {}

  generateToken(data:LoginRequest) {
    return this.http.post<any[]>(`${this.ApiURL}/generate-token`,data );
  }

  public currentUser(){
    return this.http.get(`${this.ApiURL}/current-user`);
  }

  loginUser(token:string)
  {
    localStorage.setItem("token" , token);
    return true;
  }

  public isLoggedIn(){

    let token = localStorage.getItem("token");

    if(token ==  undefined || token ==''|| token==null)
    {
      return false;
    }else{
      return true;
    }
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(['/login'], { 
      replaceUrl: true 
    });
    return true;
  }

  getToken(){
    return localStorage.getItem("token");
  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser()
  {
    let user = localStorage.getItem('user');
    if(user!=null)
    {
      return JSON.parse(user);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRoll(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
