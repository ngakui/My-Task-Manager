import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../../services/task.service';
import * as TasksActions  from '../actions/tasks.actions';
import { catchError, map, mergeMap, of } from 'rxjs';



@Injectable()
export class TasksEffects {


  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {}

  loadTasks$ = createEffect(() => 
  this.actions$.pipe(
    ofType(TasksActions.loadTasks),
    mergeMap(() => this.taskService.getTasks()
    .pipe(
      map(tasks => TasksActions.loadTasksSuccess({ tasks })),
      catchError(error => of(TasksActions.loadTasksFailure({ error })))
      ))
    )
  )

  loadOneTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadOneTask),
      mergeMap(({ id }) => this.taskService.getTask(id)
      .pipe(
        map(task => TasksActions.loadOneTaskSuccess({ task })),
        catchError(error => of(TasksActions.loadOneTaskFailure({ error })))
      ))
    )
  )

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.createTask),
      mergeMap(({ task }) => this.taskService.createTask(task)
      .pipe(
        map(task => TasksActions.createTaskSuccess({ task })),
        catchError(error => of(TasksActions.createTaskFailure({ error })))
      ))
    )
  )

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      mergeMap(({ task }) => this.taskService.updateTask(task)
      .pipe(
        map(task => TasksActions.updateTaskSuccess({ task })),
        catchError(error => of(TasksActions.updateTaskFailure({ error })))
      ))
    )
  )

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      mergeMap(({ task }) => this.taskService.deleteTask(task.id)
      .pipe(
        map(() => TasksActions.deleteTaskSuccess({ task })),
        catchError(error => of(TasksActions.deleteTaskFailure({ error })))
      ))
    )
  )
}
