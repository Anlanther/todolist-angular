import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { CompletedListComponent } from './completed-list/completed-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './state/task.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './state/task.effects';

// ng g m task(folder)/task(name of this file) --flat (do not create new file) -m app (import in app module)

const taskRoutes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'completed', component: CompletedListComponent },
  
  
  // WIP - Creating resolver for lazy loading 
  // {
  //   path: 'tasks/:id',
  //   canActivate: [TaskDetailGuard],
  //   component: TaskDetailComponent,
  //   resolve: { resolvedData: TaskResolver },
  // },
];

@NgModule({
  declarations: [
    AddTaskComponent,
    CompletedListComponent,
    TaskDetailComponent,
    TaskListComponent,
  ],
  imports: [
    CommonModule, // this exports forms and router module for other modules
    ReactiveFormsModule,
    RouterModule.forChild(taskRoutes),
    StoreModule.forFeature('tasks', taskReducer),
    EffectsModule.forFeature([TaskEffects])
  ],
})
export class TaskModule {}
