import { tasksReducer, initialState } from './tasks.reducer';
import * as TasksActions  from '../actions/tasks.actions';

describe('Tasks Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = tasksReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('loadTasks', () => {
    it('should set loading to true', () => {
      const action = TasksActions.loadTasks();

      const result = tasksReducer(initialState, action);

      expect(result.loading).toBeTrue();
    });
  });
});
