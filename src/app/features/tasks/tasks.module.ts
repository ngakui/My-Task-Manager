import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { provideStore, StoreModule } from '@ngrx/store';
import { tasksFeatureKey, tasksReducer } from './store/reducers/tasks.reducer';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { TasksEffects } from './store/effects/tasks.effects';


@NgModule({
  providers: [
    provideStore({[tasksFeatureKey]: tasksReducer}),
    provideEffects(TasksEffects)
  ],
  declarations: [],
  imports: [
    TasksRoutingModule,
    SharedModule,
    StoreModule.forFeature(tasksFeatureKey, tasksReducer),
    EffectsModule.forFeature([TasksEffects])
  ]
})
export class TasksModule { }
