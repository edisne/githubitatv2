import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {map} from 'rxjs/operators'
import { User } from 'src/app/core/models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  saveUser(user: User){
    this.http.post(this.baseUrl+'/users.json',user).subscribe(response=>{
    })
  }
  getAll(){
    let users: User[] = [];
    return this.http.get<User[]>(this.baseUrl+'/users.json')
    .pipe(map(response=>{
      for(let key in response){
        users.push({...response[key],id:key,token:''})
      }
      return users;
    }))
  }
  get(id:string){
    return this.http.get<User>(this.baseUrl + '/users/' + id + '.json');
  }
}
