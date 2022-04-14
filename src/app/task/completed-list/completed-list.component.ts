import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from '../task';

@Component({
  selector: 'app-completed-list',
  templateUrl: './completed-list.component.html',
  styleUrls: ['./completed-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedListComponent {
  @Input() tasks!: ITask[];
  @Input() errorMessage!: string;
  @Output() filterChanged = new EventEmitter<string>();
  @Output() statusChanged = new EventEmitter<ITask>();

  onFilterSelected(priorityFilter: string): void {
    this.filterChanged.emit(priorityFilter);
  }
  checkChanged(currentTask: ITask) {
    this.statusChanged.emit(currentTask);
  }
}
