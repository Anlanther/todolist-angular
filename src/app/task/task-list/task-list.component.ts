import { Component, OnInit } from '@angular/core';
import { ITask } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  filteredTasks: ITask[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
