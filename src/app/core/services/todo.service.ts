import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  save(todo: Todo){
    this.http.post<Todo>(this.baseUrl+'/todos.json',todo).subscribe(response=>{
    })
  }
  getAll(){
    let todos: Todo[] = [];
    return this.http.get<Todo[]>(this.baseUrl+'/todos.json')
                    .pipe(map(response=>{
                      for(let key in response){
                        todos.push({...response[key],id:key})
                      }
                      return todos;
                    }))
  }
  get(id:string){
    return this.http.get<Todo>(this.baseUrl + '/todos/' + id + '.json');
  }

}
