import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  map,
  Subject,
  Subscription,
} from 'rxjs';
import { State } from 'src/app/state/app.state';
import { ITask } from '../task';
import { TaskService } from '../task.service';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  displayTask: boolean = true;
  sub!: Subscription;

  private _errorMessageSubject = new Subject<string>();
  errorMessage$ = this._errorMessageSubject.asObservable();

  // Action stream
  // Type of task here is inferred, as tasks$ in the service has already been given a type
  private _priorityFilterSubject = new BehaviorSubject<string>('');
  priorityFilterAction$ = this._priorityFilterSubject.asObservable();

  // Task Filtering
  tasks$ = combineLatest([
    this.taskService.tasks$,
    this.priorityFilterAction$,
  ]).pipe(
    map(([tasks, selectedPriorityLevel]) =>
      tasks.filter((task) =>
        selectedPriorityLevel
          ? task.priorityLevel === Number(selectedPriorityLevel)
          : true
      )
    ),
    map((tasks) => tasks.filter((task) => !task.isComplete)),
    catchError((err) => {
      this._errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  private _statusSubject = new Subject<ITask>();
  statusAction$ = this._statusSubject.asObservable();

  constructor(private taskService: TaskService, private store: Store<State>) {}

  // Changing filter
  onFilterSelected(priorityLevel: string): void {
    this._priorityFilterSubject.next(priorityLevel);
  }

  checkChanged() {
    this.store.dispatch({ type: '[Task] Toggle Task Status' });
  }
}
