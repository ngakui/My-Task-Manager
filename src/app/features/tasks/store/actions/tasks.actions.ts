import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const loadTasks = createAction('[Tasks] Load Tasks');
export const loadTasksSuccess = createAction('[Tasks API] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Tasks API] Load Tasks Failure', props<{ error: any }>());

export const loadOneTask = createAction('[Task] Load Task', props<{ id: string }>());
export const loadOneTaskSuccess = createAction('[Task API] Load Task Success', props<{ task: Task }>());
export const loadOneTaskFailure = createAction('[Task API] Load Task Failure', props<{ error: any }>());


export const createTask = createAction('[Tasks Form] Create Task', props<{ task: Task }>());
export const createTaskSuccess = createAction('[Tasks API] Create Task Success', props<{ task: Task }>());
export const createTaskFailure = createAction('[Tasks API] Create Task Failure', props<{ error: any }>());

export const updateTask = createAction('[Tasks Detail] Update Task', props<{ task: Task }>());
export const updateTaskSuccess = createAction('[Tasks API] Update Task Success', props<{ task: Task }>());
export const updateTaskFailure = createAction('[Tasks API] Update Task Failure', props<{ error: any }>());

export const deleteTask = createAction('[Tasks Detail] Delete Task', props<{ task: Task }>());
export const deleteTaskSuccess = createAction('[Tasks API] Delete Task Success', props<{ task: Task }>());
export const deleteTaskFailure = createAction('[Tasks API] Delete Task Failure', props<{ error: any }>());
