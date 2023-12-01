import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { IServiceResponse } from '../interfaces/serviceResponse';



export interface Firebase{
  token:string;
  returnSecureToken:boolean;
  idToken:string;
  refreshToken:string;
  expiresIn:string;
  email:string;
  localId:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  error: string = '';
  baseUrl = environment.baseUrl;
  private userSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userSource.asObservable();


  constructor(private http:HttpClient, 
              private userService:UserService, 
              private router: Router) { }

  register(user:User){
    // this.http.post<Firebase>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebase.apiKey,{
    //   email:user.email,
    //   password:user.password,
    //   returnSecureToken:true
    // }).subscribe(resp => {
    //   //localId je userID
    //   let u:User = {
    //     name: user.name,
    //     lastName: user.lastName,
    //     email: user.email,
    //     password: user.password,
    //     uid: resp.localId,
    //     token: resp.token,
    //   }
    //   this.userService.saveUser(u);
    // });
    return this.http.post(this.baseUrl + 'account/register', user).pipe(
      tap(response => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      }))
  }
  setCurrentUser(user: any) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.userSource.next(user);
  }

  login(userName:string, password:string) {
    return this.http.post<IServiceResponse<User>>(this.baseUrl + 'account/login', {username: userName, password: password}).pipe(
      map((response : IServiceResponse<User>)  => {
        const user = response.data
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  logout(){
    this.userSource.next(null);
  }

  getDecodedToken(token: string){
    return JSON.parse(atob(token.split('.')[1]));
  }


}
