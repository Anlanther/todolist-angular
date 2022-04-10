import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  Subject,
  tap,
} from 'rxjs';
import { State } from 'src/app/state/app.state';
import { getTasks } from '../state/task.reducer';
import { ITask } from '../task';
import { TaskService } from '../task.service';
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

  private _priorityFilterSubject = new BehaviorSubject<string>('');
  priorityFilterAction$ = this._priorityFilterSubject.asObservable();

  ngOnInit(): void {
    this.tasks$ = this.store.select(getTasks);
    this.store.dispatch(TaskActions.loadCompleteTasks());
  }
  // tasks$ = combineLatest([
  //   this.taskService.tasks$,
  //   this.priorityFilterAction$,
  // ]).pipe(
  //   map(([tasks, selectedPriorityLevel]) =>
  //     tasks.filter((task) =>
  //       selectedPriorityLevel
  //         ? task.priorityLevel === Number(selectedPriorityLevel)
  //         : true
  //     )
  //   ),
  //   tap((tasks) => console.log('Before filter: ', JSON.stringify(tasks))),
  //   map((tasks) => tasks.filter((task) => task.isComplete)),
  //   tap((tasks) => console.log('Filtered tasks: ', JSON.stringify(tasks))),
  //   catchError((err) => {
  //     this._errorMessageSubject.next(err)
  //     return EMPTY;
  //   })
  // );

  constructor(private taskService: TaskService, private store: Store<State>) {}

  onFilterSelected(priorityLevel: string): void {
    this._priorityFilterSubject.next(priorityLevel);
  }

  checkChange(currentTask: ITask) {
    const task: ITask = { ...currentTask, isComplete: !currentTask.isComplete };
    console.log('Updated status: ', JSON.stringify(task));
    this.store.dispatch(TaskActions.updateTask({ task }))
  }
}
