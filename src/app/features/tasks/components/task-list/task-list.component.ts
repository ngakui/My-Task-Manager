import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { select, Store } from '@ngrx/store';
import * as TasksActions  from '../../store/actions/tasks.actions';
import { selectAllTasks, selectError, selectLoading } from '../../store/selectors/tasks.selectors';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from "../task-item/task-item.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  tasks$!: Observable<Task[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(TasksActions.loadTasks());
    this.tasks$ = this.store.pipe(select(selectAllTasks));
    console.log('GEt all tasks',this.tasks$);
    this.loading$ = this.store.pipe(select(selectLoading));
    this.error$ = this.store.pipe(select(selectError));
  }

  onDelete(task: Task): void {
    console.log('Delete task in List', task.id);
    this.store.dispatch(TasksActions.deleteTask({ task }));
  }
}
