import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {

  @Input() task!: Task;
  @Output() deleted = new EventEmitter<string>();

  onDelete(): void {
    console.log('Delete a task', this.task.id);
    this.deleted.emit(this.task.id);
  }
}
