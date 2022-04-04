import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, Subject, tap } from 'rxjs';
import { State } from 'src/app/state/app.state';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-completed-list',
  templateUrl: './completed-list.component.html',
  styleUrls: ['./completed-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedListComponent {
  private _errorMessageSubject = new Subject<string>();
  errorMessageAction$ = this._errorMessageSubject.asObservable();

  private _priorityFilterSubject = new BehaviorSubject<string>('');
  priorityFilterAction$ = this._priorityFilterSubject.asObservable();

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
    tap((tasks) => console.log('Filtered tasks: ', JSON.stringify(tasks))),
    map((tasks) => tasks.filter((task) => task.isComplete)),
    tap((tasks) => console.log('Filtered tasks: ', JSON.stringify(tasks))),
    catchError((err) => {
      this._errorMessageSubject.next(err)
      return EMPTY;
    })
  );

  constructor(private taskService: TaskService, private store: Store<State>) {}

  onFilterSelected(priorityLevel: string): void {
    this._priorityFilterSubject.next(priorityLevel);
  }

  checkChange(taskId: number) {
    this.taskService.changeStatus(taskId);
  }
}
