import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  filter,
  map,
  Observable,
  of,
  Subject,
} from 'rxjs';
import { ITask } from '../task';
import { TaskService } from '../task.service';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  @Input() completedStatus: boolean = false; // need to figure out how to implement a tick
  @Output() statusClicked: EventEmitter<string> = new EventEmitter<string>();

  errorMessage = '';

  // private _listFilter = 0;
  // get listFilter(): number {
  //   return this._listFilter;
  // }

  // filteredTasks: ITask[] = [];
  // filteredTasks$ = this.taskService.tasks$.pipe(
  //   map((tasks) =>
  //     tasks.filter((task) =>
  //       this._listFilter ? task.priorityLevel === this._listFilter : true
  //     )
  //   )
  // );

  // Type of task here is inferred, as tasks$ in the service has already been given a type
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
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(private taskService: TaskService) {}

  // onClick(): void {
  //   this.statusClicked.emit  // need to figure out how to implement change of tick method
  // }

  // performFilter(filterBy: string): ITask[] {
  //   return this.tasks$.filter(
  //     (task: ITask) => task.priorityLevel.toString() == filterBy
  //   );
  // }

  onSelected(priorityLevel: string): void {
    // + is added here to cast string to a number
    this._priorityFilterSubject.next(priorityLevel);
  }
}
