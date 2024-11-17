import { Routes } from '@angular/router';
import { TaskListComponent } from './features/tasks/components/task-list/task-list.component';
import { TaskDetailComponent } from './features/tasks/containers/task-detail/task-detail.component';
import { HomePageComponent } from './features/home/components/home-page/home-page.component';

export const routes: Routes = [
    { 
        path: 'home', 
        component: HomePageComponent 
    },
    { 
        path: 'tasks', 
        component: TaskListComponent, 
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];
