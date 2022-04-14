import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { ITask, ITaskResolved } from './task';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class TaskResolver implements Resolve<ITaskResolved> {
  constructor(private taskService: TaskService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ITaskResolved> {
    const id = route.paramMap.get('id');

    if (isNaN(+id!)) {
      const message = `Task id was not a number: ${id}`;
      console.error(message);
      return of({ task: null, error: message });
    }

    return this.taskService.getTask(+id!).pipe(
      map((task) => ({ task })),
      catchError((err) => {
        const message = `Retrieval error: ${err}`;
        console.error(message);
        return of({ task: null, error: message });
      })
    );
  }
}
