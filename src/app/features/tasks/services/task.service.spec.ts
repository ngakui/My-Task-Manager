import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of tasks', (done) => {
    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should return a task by id', (done) => {
    service.getTask('1').subscribe(task => {
      expect(task.id).toEqual('1');
      done();
    });
  });

  it('should create a task', (done) => {
    const task: Task = {
      id: '4',
      title: 'Task 4',
      description: 'Description 4',
      creationDate: new Date(),
      dueDate: new Date(),
      completed: false
    };

    service.createTask(task).subscribe(createdTask => {
      expect(createdTask.id).toEqual('4');
      done();
    });
  });

  it('should update a task', (done) => {
    const task: Task = {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      creationDate: new Date(),
      dueDate: new Date(),
      completed: true
    };

    service.updateTask(task).subscribe(updatedTask => {
      expect(updatedTask.completed).toBeTrue();
      done();
    });
  });

  it('should delete a task', (done) => {
    service.deleteTask('1').subscribe(() => {
      service.getTask('1').subscribe(task => {
        expect(task).toBeUndefined();
        done();
      });
    });
  });
});