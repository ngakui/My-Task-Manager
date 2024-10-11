import { createReducer, on } from '@ngrx/store';
import { TasksActions } from '../actions/tasks.actions';

export const tasksFeatureKey = 'tasks';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

