import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as TasksActions  from '../../store/actions/tasks.actions';
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {

  @Input() task!: Task;
  task$!: Observable<Task>;

  constructor(private route: ActivatedRoute, private store: Store ) { }

  ngOnInit(): void {
    
  }

  onUpdate(task: Task): void {
    this.store.dispatch(TasksActions.updateTask({ task }));
  }

}
