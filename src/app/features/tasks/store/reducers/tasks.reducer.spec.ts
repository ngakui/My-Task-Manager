import { tasksReducer, initialState } from './tasks.reducer';
import * as TasksActions  from '../actions/tasks.actions';
import { Task, TaskStatus } from '../../models/task.model';

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

  describe('loadTasksSuccess', () => {
    it('should set loading to false and add tasks', () => {

      const tasks: Task[] = [
        {id: '1', title: 'Task 1', description: 'Description 1', creationDate: new Date(), dueDate: new Date(), completed: false, status: TaskStatus.Todo},
        {id: '2', title: 'Task 2', description: 'Description 2', creationDate: new Date(), dueDate: new Date(), completed: false, status: TaskStatus.Todo},
      ];

      const action = TasksActions.loadTasksSuccess({ tasks });

      const result = tasksReducer({ ...initialState, loading: true }, action);

      expect(result.loading).toBeFalse();
      expect(result.entities['1']).toEqual(tasks[0]);
    });
  });

  describe('loadOneTask', () => {
    it('should set loading to true', () => {
      const action = TasksActions.loadOneTask({ id: '1' });

      const result = tasksReducer(initialState, action);

      expect(result.loading).toBeTrue();
    });
  });

  describe('loadOneTaskSuccess', () => {
    it('should set loading to false and add task', () => {

      const task: Task = {id: '1', title: 'Task 1', description: 'Description 1', creationDate: new Date(), dueDate: new Date(), completed: false, status: TaskStatus.Todo};

      const action = TasksActions.loadOneTaskSuccess({ task });

      const result = tasksReducer({ ...initialState, loading: true }, action);

      expect(result.loading).toBeFalse();
      expect(result.entities['1']).toEqual(task);
    });
  });

  describe('createTaskSuccess', () => {
    it('should add task', () => {

      const task: Task = {id: '1', title: 'Task 1', description: 'Description 1', creationDate: new Date(), dueDate: new Date(), completed: false, status: TaskStatus.Todo};

      const action = TasksActions.createTaskSuccess({ task });

      const result = tasksReducer(initialState, action);

      expect(result.entities['1']).toEqual(task);
    });
  });

  describe('updateTaskSuccess', () => {
    it('should update task', () => {

      const task: Task = {id: '1', title: 'Task 1', description: 'Description 1', creationDate: new Date(), dueDate: new Date(), completed: false, status: TaskStatus.Todo};

      const action = TasksActions.updateTaskSuccess({ task });

      const result = tasksReducer({ ...initialState, entities: { '1': task } }, action);

      expect(result.entities['1']).toEqual(task);
    });
  });

  describe('deleteTaskSuccess', () => {
    it('should delete task', () => {

      const task: Task = {id: '1', title: 'Task 1', description: 'Description 1', creationDate: new Date(), dueDate: new Date(), completed: false, status: TaskStatus.Todo};

      const action = TasksActions.deleteTaskSuccess({ task });

      const result = tasksReducer({ ...initialState, entities: { '1': task } }, action);

      expect(result.entities['1']).toBeUndefined();
    });
  });

  describe('loadTasksFailure', () => {
    it('should set error', () => {
      const error = 'Error loading tasks';

      const action = TasksActions.loadTasksFailure({ error });

      const result = tasksReducer(initialState, action);

      expect(result.error).toEqual(error);
    });
  });

  describe('loadOneTaskFailure', () => {
    it('should set error', () => {
      const error = 'Error loading task';

      const action = TasksActions.loadOneTaskFailure({ error });

      const result = tasksReducer(initialState, action);

      expect(result.error).toEqual(error);
    });
  });

  describe('createTaskFailure', () => {
    it('should set error', () => {
      const error = 'Error creating task';

      const action = TasksActions.createTaskFailure({ error });

      const result = tasksReducer(initialState, action);

      expect(result.error).toEqual(error);
    });
  });

  describe('updateTaskFailure', () => {
    it('should set error', () => {
      const error = 'Error updating task';

      const action = TasksActions.updateTaskFailure({ error });

      const result = tasksReducer(initialState, action);

      expect(result.error).toEqual(error);
    });
  });

  describe('deleteTaskFailure', () => {
    it('should set error', () => {
      const error = 'Error deleting task';

      const action = TasksActions.deleteTaskFailure({ error });

      const result = tasksReducer(initialState, action);

      expect(result.error).toEqual(error);
    });
  });
});
