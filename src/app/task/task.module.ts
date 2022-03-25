import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { CompletedListComponent } from './completed-list/completed-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaskDetailGuard } from './task-detail/task-detail.guard';

// ng g m task(folder)/task(name of this file) --flat (do not create new file) -m app (import in app module)
@NgModule({
  declarations: [
    AddTaskComponent,
    CompletedListComponent,
    TaskDetailComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule, // this exports forms and router module for other modules
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'tasks', component: TaskListComponent },
      { path: 'tasks/:id', canActivate: [TaskDetailGuard], component: TaskDetailComponent },
      { path: 'completed', component: CompletedListComponent },
    ])
  ]
})
export class TaskModule { }
