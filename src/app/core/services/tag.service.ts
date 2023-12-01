import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from 'src/app/todo/todo-form/todo-form.component';
import { environment } from 'src/environments/environment';
import { IServiceResponse } from '../interfaces/serviceResponse';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<IServiceResponse<Tag[]>>(this.baseUrl + 'tag/getall');
  }
}
