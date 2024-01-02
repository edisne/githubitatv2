import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  searchUsers(username: string): Observable<any> {
    return this.http.get<User[]>(`${this.apiUrl}/search/users?q=${username}`);
  }

  getUsers(pageSize: number, since: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users?since=${since}&per_page=${pageSize}`);
  }

  getUserDetails(username: string): Observable<any> {
    return this.http.get<User>(`${this.apiUrl}/users/${username}`);
  }

  getUserRepos(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}/repos`);
  }

  getUserFollowers(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}/followers`);
  }
}
