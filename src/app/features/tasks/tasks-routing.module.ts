import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './containers/task-detail/task-detail.component';
import { provideState } from '@ngrx/store';
import { tasksFeatureKey, tasksReducer } from './store/reducers/tasks.reducer';

const routes: Routes = [
  { path: '', 
    providers: [
      provideState({name: tasksFeatureKey, reducer: tasksReducer}),
    ]
  }      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
