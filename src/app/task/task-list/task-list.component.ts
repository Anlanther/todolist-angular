import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  Subject,
} from 'rxjs';
import { State } from 'src/app/state/app.state';
import { ITask } from '../task';
import * as TaskActions from '../state/task.actions';
import { getTasks } from '../state/task.reducer';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<ITask[]>;

  private _errorMessageSubject = new Subject<string>();
  errorMessage$ = this._errorMessageSubject.asObservable();

  // Action stream
  // Type of task here is inferred, as tasks$ in the service has already been given a type
  // TODO: Change Error methods to use NgRx
  private _priorityFilterSubject = new BehaviorSubject<string>('');
  priorityFilterAction$ = this._priorityFilterSubject.asObservable();

  constructor(
    private store: Store<State>,
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.store.select(getTasks);
    this.store.dispatch(TaskActions.loadIncompleteTasks());
  }

  // Changing filter
  onFilterSelected(priorityFilter: string): void {
    // this._priorityFilterSubject.next(priorityLevel);
    this.store.dispatch(TaskActions.toggleIncomepletePriority({ priorityFilter }));
  }

  checkChanged(currentTask: ITask) {
    const task: ITask = { ...currentTask, isComplete: !currentTask.isComplete };
    console.log('Updated status: ', JSON.stringify(task));
    this.store.dispatch(TaskActions.updateTask({ task }));
  }
}
