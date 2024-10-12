import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private fakeTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      creationDate: new Date(),
      dueDate: new Date(),
      completed: false
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      creationDate: new Date(),
      dueDate: new Date(),
      completed: true
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description 3',
      creationDate: new Date(),
      dueDate: new Date(),
      completed: false
    }
  ];

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    // return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
    return new Observable<Task[]>(observer => {
      observer.next(this.fakeTasks);
    });
  }

  getTask(id: string): Observable<Task> {
    // return this.http.get<Task>(`${environment.apiUrl}/tasks/${id}`);
    return new Observable<Task>(observer => {
      observer.next(this.fakeTasks.find(task => task.id === id));
    });
  }

  createTask(task: Task): Observable<Task> {
    // return this.http.post<Task>(`${environment.apiUrl}/tasks`, task);
    return new Observable<Task>(observer => {
      this.fakeTasks.push(task);
      observer.next(task);
    });
  }

  updateTask(task: Task): Observable<Task> {
    // return this.http.put<Task>(`${environment.apiUrl}/tasks/${task.id}`, task);
    return new Observable<Task>(observer => {
      const index = this.fakeTasks.findIndex(t => t.id === task.id);
      this.fakeTasks[index] = task;
      observer.next(task);
    });
  }

  deleteTask(id: string): Observable<void> {
    // return this.http.delete<void>(`${environment.apiUrl}/tasks/${id}`);
    return new Observable<void>(observer => {
      this.fakeTasks = this.fakeTasks.filter(task => task.id !== id);
      observer.next();
    });
  }
}
