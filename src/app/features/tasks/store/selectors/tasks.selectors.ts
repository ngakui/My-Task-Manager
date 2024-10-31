import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState, selectAll } from '../reducers/tasks.reducer';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const selectAllTasks = createSelector(
  selectTasksState,
  selectAll
);

export const selectLoading = createSelector(
  selectTasksState,
  (state: TasksState) => state.loading
);

export const selectError = createSelector(
  selectTasksState,
  (state: TasksState) => state.error
);

export const selectTaskById = (taskId: string) => createSelector(
  selectTasksState,
  state => state.entities[taskId]
);
