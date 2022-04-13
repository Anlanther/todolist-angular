import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { ITask } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = 'api/tasks';

  // All tasks
  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.tasksUrl).pipe(
      tap((data) => console.log('All', JSON.stringify(data))),
    catchError(this.handleError)
    );
  }

  constructor(private http: HttpClient) {}

  // Get tasks from db
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

  // From add-task component. This cannot be changed into an observable unless tasks$ is created
  // into another stream
  createTask(task: ITask): Observable<ITask> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // so that the web api can assign an id to it
    task.id = null;

    return this.http.post<ITask>(this.tasksUrl, task, { headers }).pipe(
      tap((data) => console.log('create task:' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Add task component needs a blank task template
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

  // Task detail. New task information to replace current information
  updateTask(task: ITask): Observable<ITask> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.tasksUrl}/${task.id}`;

    return this.http.put<ITask>(url, task, { headers }).pipe(
      tap(() => console.log('updateTask ID:' + task.id)),
      // Return updated task
      map(() => task),
      catchError(this.handleError)
    );
  }

  // Task detail
  deleteTask(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.tasksUrl}/${id}`;

    // the data is mapped to the shape of the interface
    return this.http.delete<ITask>(url, { headers }).pipe(
      tap((data) => console.log('deleteTask: ' + id)),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
