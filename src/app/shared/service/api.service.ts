import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from 'src/app/shared/interfaces/interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class apiService {
  private API_TODO_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.API_TODO_URL);
  }

  addTodo(task: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>(this.API_TODO_URL, task);
  }

  editTodo(task: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.API_TODO_URL}/${task.id}`, task);
  }

  deleteTodo(id: number): Observable<number> {
    return this.http.delete<number>(`${this.API_TODO_URL}/${id}`);
  }
}
