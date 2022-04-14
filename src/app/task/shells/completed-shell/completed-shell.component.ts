import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { State } from 'src/app/state/app.state';
import { getTasks } from '../../state';
import { TaskApiActions } from '../../state/actions';
import { ITask } from '../../task';

@Component({
  templateUrl: './completed-shell.component.html',
})
export class CompletedShellComponent implements OnInit {
  tasks$!: Observable<ITask[]>;

    // TODO: Change Error methods to use NgRx
  private _errorMessageSubject = new Subject<string>();
  errorMessage$ = this._errorMessageSubject.asObservable();

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.tasks$ = this.store.select(getTasks);
    this.store.dispatch(TaskApiActions.loadCompleteTasks());
  }

  // Changing filter
  onFilterSelected(priorityFilter: string): void {
    // this._priorityFilterSubject.next(priorityLevel);
    this.store.dispatch(
        TaskApiActions.toggleComepletePriority({ priorityFilter })
    );
  }

  checkChanged(currentTask: ITask) {
    const task: ITask = { ...currentTask, isComplete: !currentTask.isComplete };
    console.log('Updated status: ', JSON.stringify(task));
    this.store.dispatch(TaskApiActions.updateTask({ task }));
  }
}
