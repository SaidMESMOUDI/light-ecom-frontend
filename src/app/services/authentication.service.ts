import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private users = [
    {"username": "admin", "password": "adminpass", "roles": ["ADMIN", "USER"]},
    {"username": "user1", "password": "userpass", "roles": ["USER"]},
    {"username": "user2", "password": "userpass", "roles": ["USER"]}
  ];
  private _isAuthenticated:boolean;
  private _userAuthenticated;

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  get userAuthenticated() {
    return this._userAuthenticated;
  }

  set userAuthenticated(value) {
    this._userAuthenticated = value;
  }

  constructor() { }

  public login(username:string, password:string){
    let user;
    this.users.forEach(u =>{
      if(u.username == username && u.password == password){
        user = u;
      }
    });
    if(user){
      this._isAuthenticated = true;
      this._userAuthenticated = user;
    }
    else {
      this._isAuthenticated = false;
      this._userAuthenticated = undefined;
    }
  }

  public isAdmin(){
    if (this.userAuthenticated) {
      if(this.userAuthenticated.roles.indexOf('ADMIN') > -1){
        return true
      }
      return false;
    }
  }


}
