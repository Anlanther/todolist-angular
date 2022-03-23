import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: ITask | undefined;
  errorMessage = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private taskService: TaskService) { }

  ngOnInit(): void {
    //it knows the param after 'tasks' is what it is getting because it was defined in app module's routing :id
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    console.log(`Looking at task id ${id}`);

    if (id) {
      this.getTask(id);
    }
  }

  // Can use this method to make sure something saves before going back to a page
  onBack(): void {
    this.router.navigate(['/tasks']);
  }

  getTask(id: number): void {
    this.taskService.getTask(id).subscribe({
      next: (task) => this.task = task,
      error: (err) => this.errorMessage = err
    })
  }

}
