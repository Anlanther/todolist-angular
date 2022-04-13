import { Injectable } from '@angular/core';
import { TaskService } from '../task.service';

import * as TaskActions from './task.actions';

// Make sure to import Actions from the correct library
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((error) => of(TaskActions.loadTasksFailure({ error })))
        )
      )
    );
  });

  loadIncompleteTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.loadIncompleteTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => tasks.filter((task) => !task.isComplete)),
          map((tasks) => TaskActions.loadIncompleteTasksSuccess({ tasks })),
          catchError((error) => of(TaskActions.loadIncompleteTaskFailure({ error })))
        )
      )
    );
  });
  
  loadCompleteTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.loadCompleteTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => tasks.filter((task) => task.isComplete)),
          map((tasks) => TaskActions.loadCompleteTasksSuccess({ tasks })),
          catchError((error) => of(TaskActions.loadCompleteTaskFailure({ error })))
        )
      )
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.updateTask),
      concatMap((action) =>
        this.taskService.updateTask(action.task).pipe(
          map((task) => TaskActions.updateTaskSuccess({ task })),
          catchError((error) => of(TaskActions.updateTaskFailure({ error })))
        )
      )
    );
  });

  loadIncompleteFilteredTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.togglePriorityFilter),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => tasks.filter((task) => !task.isComplete)),
          map((tasks) => TaskActions.togglePriorityFilterSuccess({ tasks })),
          // TODO: Create custom error action for this action
          catchError((error) => of(TaskActions.loadIncompleteTaskFailure({ error })))
        )
      )
    );
  });
}
