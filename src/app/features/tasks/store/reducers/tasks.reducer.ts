import { createReducer, on } from '@ngrx/store';
import * as TasksActions  from '../actions/tasks.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Task } from '../../models/task.model';

export interface TasksState extends EntityState<Task> {
  loading: boolean;
  error: any;
}

export const tasksFeatureKey = 'tasks';

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: TasksState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.loadTasks, state => {
    return { ...state, loading: true };
  }),
  on(TasksActions.loadTasksSuccess, (state, { tasks }) => {
    return adapter.setAll(tasks, { ...state, loading: false });
  }),
  on(TasksActions.loadOneTask, state => {
    return { ...state, loading: true };
  }),
  on(TasksActions.loadOneTaskSuccess, (state, { task }) => {
    return adapter.setOne(task, { ...state, loading: false});
  }),
  on(TasksActions.createTaskSuccess, (state, { task }) => {
    return adapter.addOne(task, state);
  }),
  on(TasksActions.updateTaskSuccess, (state, { task }) => {
    return adapter.updateOne({ id: task ? task.id : '', changes: task }, state);
  }),
  on(TasksActions.deleteTaskSuccess, (state, { task }) => {
    return adapter.removeOne(task.id, state);
  }),
  on(TasksActions.loadTasksFailure, TasksActions.loadOneTaskFailure, TasksActions.createTaskFailure, TasksActions.updateTaskFailure, TasksActions.deleteTaskFailure, (state, { error }) => {
    return { ...state, error };
  })
);

// Get the selectors
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

