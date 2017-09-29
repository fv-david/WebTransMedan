import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

import { Authority } from './authority';
import { User } from './user.model';
import { UserToken } from './user-token';
import { UserFull } from './user-full';

import { AuthHttp } from 'angular2-jwt';

const STORAGE_KEY_AUTH = "authentication";

@Injectable()
export class UserService {

  private static STORAGE_TOKEN_KEY = 'USER_TOKEN';
  private currentUserToken: UserToken;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private authHttp: AuthHttp) { }

  isUserAuthenticated(): boolean {
    return tokenNotExpired("access_token");
  }

  private userData: any = null;

  public static decodeAccessToken(access_token: string) {
    return JSON.parse(window.atob(access_token.split('.')[1]));
  }

  public getUserData(): any {
    let tokenData = localStorage.getItem('access_token');
    return this.userData = UserService.decodeAccessToken(tokenData);
  }

  public hasRole(role: String): boolean {
    if(this.isUserAuthenticated()) {
      return this.getUserData()['authorities'].indexOf(role) >= 0;
    }
    return false;
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_AUTH));
  }

  login(email: string, password: string): Observable<UserToken> {
    
    let url: string = "/oauth/token";
    let body = new URLSearchParams();
    body.append("grant_type", "password");
    body.append("username", email);
    body.append("password", password);

    let basicAuthHeader = "Basic ZnZCb29raW5nLWJ1czowMDdmdkJvb2tpbmdCdXMwMDc=";
    let headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization' : basicAuthHeader
    });

    return this.http.post(url, body, { headers: headers }).map((res: Response) => {
      let token = res.json();
      token.login = email;
      console.log("token : " + token);

      localStorage.setItem("access_token",token.access_token);
      let tokenContent = this.jwtHelper.decodeToken(token.access_token);
    
      let userObject = {
        username: email,
        fullname: tokenContent.user_name,
        permissions: tokenContent.authorities,
        access_token: token.access_token
      };

      console.log("permissions: ", userObject.permissions);
      localStorage.setItem("permissions", userObject.permissions);

      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(userObject));
      
      return token;
    });
  }


  register(user: User): Observable<Response> {
    return this.http.post('/api/users/register', user);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem(STORAGE_KEY_AUTH);
  }

  getAllUsers(): Observable<UserFull[]> {
    return this.authHttp.get('/api/admin/users').map((res: Response) => res.json());
  }

  deleteUser(id: number): Observable<Response> {
    return this.authHttp.delete('/api/admin/users/' + id);
  }

  updateUser(user: UserFull): Observable<Response> {
    return this.authHttp.put('/api/admin/users', user);
  }

  userHasPermission(permission: string): boolean {
    return this.isUserAuthenticated()
      && !!this.getCurrentUser().authorities.find((auth: Authority) => auth.authority === permission);
  }
}