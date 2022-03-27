import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ITask } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = 'api/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.tasksUrl).pipe(
      tap((data) => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getTask(id: number): Observable<ITask> {
    // Creating a new task
    if (id === 0) {
      return of(this.initialiseTask());
    }

    // If it is just accessing an existing task
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<ITask>(url).pipe(
      tap((data) => console.log('getTask: ' + JSON.stringify(data))),
      catchError(this.handleError)
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
    return this.http.get<ITask[]>(this.tasksUrl).pipe();
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

  createTask(task: ITask): Observable<ITask> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // so that the web api can assign an id to it
    task.id = null;

    return this.http.post<ITask>(this.tasksUrl, task, { headers }).pipe(
      tap((data) => console.log('create task:' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  initialiseTask(): ITask {
    return {
      id: 0,
      taskName: '',
      description: '',
      dueDate: '',
      priorityLevel: 0,
      isComplete: false,
    };
  }

  updateTask(task: ITask): Observable<ITask> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.tasksUrl}/${task.id}`;

    return this.http.put<ITask>(url, task, {headers}).pipe(
      tap(() => console.log('updateProduct' + task.id)),
      // Return updated task
      map(() => task),
      catchError(this.handleError)
    );
  }
}
