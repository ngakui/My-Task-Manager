import { Component } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectTaskById } from '../../store/selectors/tasks.selectors';
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

  task$!: Observable<Task>;

  constructor(private route: ActivatedRoute, private store: Store ) { }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Task ID', taskId);
    this.store.dispatch(TasksActions.loadOneTask({ id: taskId }));
    this.task$ = this.store.pipe(
      select(selectTaskById(taskId)),
      filter((task): task is Task => task !== undefined)
    );
  }

  onUpdate(task: Task): void {
    this.store.dispatch(TasksActions.updateTask({ task }));
  }

}
