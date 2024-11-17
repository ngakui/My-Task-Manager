import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private fakeTasks: Task[] = [
    {
      id: '1',
      title: 'Become the Pirate King',
      description: 'Description 1',
      creationDate: new Date(),
      dueDate: new Date(),
      completed: false,
      status: TaskStatus.Todo
    },
    {
      id: '2',
      title: 'Kill Kaïdo',
      description: 'Description 2',
      creationDate: new Date(),
      dueDate: new Date(),
      completed: true,
      status: TaskStatus.Done
    },
    {
      id: '3',
      title: 'Overthrow the Donquichotte Family',
      description: 'Description 3',
      creationDate: new Date(),
      dueDate: new Date(),
      completed: false,
      status: TaskStatus.InProgress
    },
    {
      id: '4',
      title: 'Help Dr Vegapunk',
      description: 'Description 4',
      creationDate: new Date(),
      dueDate: new Date(),
      completed: false,
      status: TaskStatus.InProgress
    },
    {
      id: '5',
      title: 'Retrieve the One Piece',
      description: 'Description 5',
      creationDate: new Date(),
      dueDate: new Date(),
      completed: false,
      status: TaskStatus.Todo
    },
    {
      id: '6',
      title: 'Activate the Gear 6',
      description: 'Description 6',
      creationDate: new Date(),
      dueDate: new Date(),
      completed: false,
      status: TaskStatus.Todo
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
      console.log("==== index ====", index);
      // this.fakeTasks[index] = task;
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
