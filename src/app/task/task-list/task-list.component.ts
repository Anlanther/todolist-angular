import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  map,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { State } from 'src/app/state/app.state';
import { ITask } from '../task';
import { TaskService } from '../task.service';
import * as TaskActions from '../state/task.actions';
import { getDisplayTask } from '../state/task.reducer';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  displayTask$!: Observable<boolean>;

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

  constructor(private store: Store<State>, private taskService: TaskService) {}

  ngOnInit(): void {
      // this.tasks$ = this.store.select(getTasks);

      // Just to indicate that this process has started. No background things happening
      this.store.dispatch(TaskActions.loadTasks()); 

      this.displayTask$ = this.store.select(getDisplayTask)
  }

  // Changing filter
  onFilterSelected(priorityLevel: string): void {
    this._priorityFilterSubject.next(priorityLevel);
  }

  checkChanged() {
    this.store.dispatch(TaskActions.toggleTaskStatus());
  }
}
