import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subject,
} from 'rxjs';
import { State } from 'src/app/state/app.state';
import { getTasks } from '../state/task.reducer';
import { ITask } from '../task';
import * as TaskActions from '../state/task.actions';

@Component({
  selector: 'app-completed-list',
  templateUrl: './completed-list.component.html',
  styleUrls: ['./completed-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedListComponent implements OnInit {
  tasks$!: Observable<ITask[]>;

  private _errorMessageSubject = new Subject<string>();
  errorMessageAction$ = this._errorMessageSubject.asObservable();

  ngOnInit(): void {
    this.tasks$ = this.store.select(getTasks);
    this.store.dispatch(TaskActions.loadCompleteTasks());
  }

  constructor(private store: Store<State>) {}

  onFilterSelected(priorityFilter: string): void {
    this.store.dispatch(TaskActions.toggleComepletePriority({ priorityFilter }));
  }

  checkChange(currentTask: ITask) {
    const task: ITask = { ...currentTask, isComplete: !currentTask.isComplete };
    console.log('Updated status: ', JSON.stringify(task));
    this.store.dispatch(TaskActions.updateTask({ task }))
  }
}
