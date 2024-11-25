import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Task, TaskStatus } from '../../models/task.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
    CalendarModule,
    DropdownModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {

  @Input() task?: Task;
  @Output() save = new EventEmitter<Task>();

  taskStatus = Object.values(TaskStatus);

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    console.log("Task Status", this.taskStatus);
    this.taskForm = this.fb.group({
      title: [this.task?.title || '', Validators.required],
      description: [this.task?.description || ''],
      dueDate: [this.task?.dueDate || ''],
      status: [this.task?.status || '']
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = {
        ...this.task,
        ...this.taskForm.value,
        id: this.task?.id || Math.random().toString(36).substr(2, 9)
      } as Task;
      this.save.emit(task);
    }
  }
}
