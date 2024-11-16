import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskStatus } from '../../models/task.model';
import { select, Store } from '@ngrx/store';
import * as TasksActions  from '../../store/actions/tasks.actions';
import { selectAllTasks, selectError, selectLoading } from '../../store/selectors/tasks.selectors';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from "../task-item/task-item.component";
import { PanelModule } from 'primeng/panel';
import { DragDropModule } from 'primeng/dragdrop';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule, 
    TaskItemComponent,
    PanelModule,
    DragDropModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  tasks$!: Observable<Task[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;
  taskStatus$ = Object.values(TaskStatus);
  draggedTask!: Task | null;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(TasksActions.loadTasks());
    this.tasks$ = this.store.pipe(select(selectAllTasks));
    
    this.loading$ = this.store.pipe(select(selectLoading));
    this.error$ = this.store.pipe(select(selectError));
  }

  onDelete(task: Task): void {
    console.log('Delete task in List', task.id);
    this.store.dispatch(TasksActions.deleteTask({ task }));
  }

  dragStart(task: Task): void {
    console.log('Drag start', task);
    this.draggedTask = task;
  }

  drop(status: TaskStatus): void {
    console.log('Drop event', status);
    console.log('Dragged task', this.draggedTask);
    if (this.draggedTask && this.draggedTask.id) {
      this.store.dispatch(TasksActions.updateTask({ task: { ...this.draggedTask, status: status } }));
    }
  }

  dragEnd(): void {
    console.log('Drag end');
    this.draggedTask = null;
  }
}
