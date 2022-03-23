import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITask } from '../task';
import { TaskService } from '../task.service';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {

  @Input() completedStatus: boolean = false; // need to figure out how to implement a tick
  @Output() statusClicked: EventEmitter<string> = new EventEmitter<string>();

  errorMessage = '';
  sub!: Subscription;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredTasks = this.performFilter(value);
  }

  filteredTasks: ITask[] = [];
  tasks: ITask[] = [];

  constructor(private taskService: TaskService) { }

  // onClick(): void {
  //   this.statusClicked.emit  // need to figure out how to implement change of tick method
  // }

  performFilter(filterBy: string): ITask[] {
    return this.tasks.filter((task: ITask) =>
      task.priorityLevel.toString() == filterBy)
  }

  ngOnInit(): void {
    this.sub = this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filteredTasks = this.tasks;
      },
      error: (err) => this.errorMessage = err
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
