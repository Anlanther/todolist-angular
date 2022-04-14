import { Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  
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
