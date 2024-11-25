import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import * as TasksActions  from '../actions/tasks.actions';
import { TasksEffects } from './tasks.effects';
import { Action } from '@ngrx/store';
import { TaskService } from '../../services/task.service';
import { TaskStatus } from '../../models/task.model';
import { cold, hot } from 'jasmine-marbles';

describe('TasksEffects', () => {
  let actions$: Observable<Action>;
  let effects: TasksEffects;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  const mockTask = { id: '1', title: 'Task 1', description: 'Description 1', status: TaskStatus.Todo, creationDate: new Date(), dueDate: new Date(), completed: false };
  const mockTasks = [mockTask];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskService', ['getTasks', 'getTask', 'createTask', 'updateTask', 'deleteTask']);
    TestBed.configureTestingModule({
      providers: [
        TasksEffects,
        provideMockActions(() => actions$),
        { provide: TaskService, useValue: spy }
      ]
    });

    effects = TestBed.inject(TasksEffects);
    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch loadTasksSuccess action', () => {
    
    taskServiceSpy.getTasks.and.returnValue(cold('-a|', { a: mockTasks }));
    actions$ = hot('-a|', { a: TasksActions.loadTasks });

    const expected = cold('--b|', { b: TasksActions.loadTasksSuccess({ tasks: mockTasks }) });
    expect(effects.loadTasks$).toBeObservable(expected);  
  });

  it('should dispatch loadOneTaskSuccess action', () => {
    taskServiceSpy.getTask.and.returnValue(cold('-a|', { a: mockTask }));
    actions$ = hot('-a|', { a: TasksActions.loadOneTask({ id: '1' }) });

    const expected = cold('--b|', { b: TasksActions.loadOneTaskSuccess({ task: mockTask }) });
    expect(effects.loadOneTask$).toBeObservable(expected);
  });

  it('should dispatch createTaskSuccess action', () => {
    taskServiceSpy.createTask.and.returnValue(cold('-a|', { a: mockTask }));
    actions$ = hot('-a|', { a: TasksActions.createTask({ task: mockTask }) });

    const expected = cold('--b|', { b: TasksActions.createTaskSuccess({ task: mockTask }) });
    expect(effects.createTask$).toBeObservable(expected);
  });

  it('should dispatch updateTaskSuccess action', () => {
    taskServiceSpy.updateTask.and.returnValue(cold('-a|', { a: mockTask }));
    actions$ = hot('-a|', { a: TasksActions.updateTask({ task: mockTask }) });

    const expected = cold('--b|', { b: TasksActions.updateTaskSuccess({ task: mockTask }) });
    expect(effects.updateTask$).toBeObservable(expected);
  });

  it('should dispatch deleteTaskSuccess action', () => {
    taskServiceSpy.deleteTask.and.returnValue(cold('-a|'));
    actions$ = hot('-a|', { a: TasksActions.deleteTask({ task: mockTask }) });

    const expected = cold('--b|', { b: TasksActions.deleteTaskSuccess({ task: mockTask }) });
    expect(effects.deleteTask$).toBeObservable(expected);
  });
});
