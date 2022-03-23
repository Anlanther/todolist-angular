import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ITask } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'api/tasks'

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.tasksUrl).pipe(
      tap((data) => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  
  getTask(id: number): Observable<ITask | undefined> {
    return this.getAllTasks().pipe(
      map((data: ITask[]) => data.find((task) => task.taskId == id))
    );
  }

  getIncompletedlTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.tasksUrl).pipe(
      tap((data) => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Need to review over RxJS topic
  getCompleteTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.tasksUrl).pipe(
    )
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
