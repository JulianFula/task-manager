import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7070/api/Tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(TasksRequest: { nombre: string; descripcion: string; completado: boolean; }): Observable<any> {  
    return this.http.post(this.apiUrl, TasksRequest);
  }

  updateTask(TasksRequest: { taskId: number, nombre: string; descripcion: string; completado: boolean; }): Observable<void> {
    return this.http.put<void>(this.apiUrl, TasksRequest);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
