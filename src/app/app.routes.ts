import { Routes } from '@angular/router';
import { TaskListComponent } from './features/tasks/components/task-list/task-list.component';
import { TaskDetailComponent } from './features/tasks/containers/task-detail/task-detail.component';

export const routes: Routes = [
    { path: 'tasks', component: TaskListComponent, 
        children: [
            { path: ':id', component: TaskDetailComponent },   
        ]
    },
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: '**', redirectTo: '/tasks' }
];
