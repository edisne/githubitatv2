import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators'
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { IServiceResponse } from '../interfaces/serviceResponse';
import { PaginatedResult } from '../interfaces/pagination';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public paginatedResult : PaginatedResult<Todo[]> = new PaginatedResult<Todo[]>();
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(page?: number, itemsPerPage?: number, search?: string, tagFilter?: string){

    let params = new HttpParams();
    if(page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if(search) {
      params = params.append('search', search);
    }

    if(tagFilter) {
      params = params.append('tag', tagFilter);
    }

    return this.http.get<IServiceResponse<Todo[]>>(this.baseUrl + 'todo/getall', {observe: 'response', params}).pipe(
      map(response => {
        if (response.body) {
          this.paginatedResult.result = response.body.data!;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          this.paginatedResult.pagination = JSON.parse(pagination);
        }
        return this.paginatedResult
      })
    );    
  }
  get(id:string){
    return this.http.get<IServiceResponse<Todo>>(this.baseUrl + 'todo/' + id);
  }
  save(todo: Todo){
    return this.http.post<Todo>(this.baseUrl + 'todo', todo);
  }
  update(todo:Todo){
    const date = new Date (todo.date)
    todo.date = this.convertDateToUTC(date);
   return this.http.put<Todo>(this.baseUrl + 'todo', todo);
  }
  delete(id:any){
    return this.http.delete(this.baseUrl + 'todo/'+ id);
   }

  convertDateToUTC(date: Date): Date {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 
                             date.getHours(), date.getMinutes(), date.getSeconds()));
  }
}
