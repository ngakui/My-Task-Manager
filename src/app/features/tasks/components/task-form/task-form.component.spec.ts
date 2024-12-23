import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify the form is invalid when empty', () => {
    expect(component.taskForm.valid).toBeFalsy();
  } );

  it('should verify the title field is invalid when empty', () => {
    const title = component.taskForm.controls['title'];
    expect(title.valid).toBeFalsy();
  });
});
