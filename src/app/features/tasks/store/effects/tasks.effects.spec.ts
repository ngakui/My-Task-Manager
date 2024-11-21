import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import * as TasksActions  from '../actions/tasks.actions';
import { TasksEffects } from './tasks.effects';
import { Action } from '@ngrx/store';
import { TaskService } from '../../services/task.service';
import { TaskStatus } from '../../models/task.model';

describe('TasksEffects', () => {
  let actions$: Observable<Action>;
  let effects: TasksEffects;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

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

  it('should dispatch loadTasksSuccess action', (done) => {
    const tasks = [{ id: '1', title: 'Task 1', description: 'Description 1', status: TaskStatus.Todo, creationDate: new Date(), dueDate: new Date(), completed: false }];
    actions$ = TestBed.inject(TasksActions.loadTasks);
    taskServiceSpy.getTasks.and.returnValue(new Observable(observer => {
      observer.next(tasks);
    }));

    effects.loadTasks$.subscribe(action => {
      expect(action).toEqual(TasksActions.loadTasksSuccess({ tasks }));
      done();
    });
  });

  it('should dispatch loadOneTaskSuccess action', (done) => {
    const task = { id: '1', title: 'Task 1', description: 'Description 1', status: TaskStatus.Todo, creationDate: new Date(), dueDate: new Date(), completed: false };
    actions$ = TestBed.inject(TasksActions.loadOneTask);
    taskServiceSpy.getTask.and.returnValue(new Observable(observer => {
      observer.next(task);
    }));

    effects.loadOneTask$.subscribe(action => {
      expect(action).toEqual(TasksActions.loadOneTaskSuccess({ task }));
      done();
    });
  });

  it('should dispatch createTaskSuccess action', (done) => {
    const task = { id: '1', title: 'Task 1', description: 'Description 1', status: TaskStatus.Todo, creationDate: new Date(), dueDate: new Date(), completed: false };
    actions$ = TestBed.inject(TasksActions.createTask);
    taskServiceSpy.createTask.and.returnValue(new Observable(observer => {
      observer.next(task);
    }));

    effects.createTask$.subscribe(action => {
      expect(action).toEqual(TasksActions.createTaskSuccess({ task }));
      done();
    });
  });

  it('should dispatch updateTaskSuccess action', (done) => {
    const task = { id: '1', title: 'Task 1', description: 'Description 1', status: TaskStatus.Todo, creationDate: new Date(), dueDate: new Date(), completed: false };
    actions$ = TestBed.inject(TasksActions.updateTask);
    taskServiceSpy.updateTask.and.returnValue(new Observable(observer => {
      observer.next(task);
    }));

    effects.updateTask$.subscribe(action => {
      expect(action).toEqual(TasksActions.updateTaskSuccess({ task }));
      done();
    });
  });

  it('should dispatch deleteTaskSuccess action', (done) => {
    const task = { id: '1', title: 'Task 1', description: 'Description 1', status: TaskStatus.Todo, creationDate: new Date(), dueDate: new Date(), completed: false };
    actions$ = TestBed.inject(TasksActions.deleteTask);
    taskServiceSpy.deleteTask.and.returnValue(new Observable(observer => {
      observer.next();
    }));

    effects.deleteTask$.subscribe(action => {
      expect(action).toEqual(TasksActions.deleteTaskSuccess({ task }));
      done();
    });
  });
});
