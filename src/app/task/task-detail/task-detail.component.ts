import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, fromEvent, merge, Observable, Subscription } from 'rxjs';
import { GenericValidator } from '../add-task/generic-validator';
import { ITask, ITaskResolved } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  task!: ITask;
  taskEditForm!: FormGroup;
  errorMessage = '';

  inputErrorMessage: {
    taskName?: string;
    dueDate?: string;
    priority?: string;
  } = {};

  private _sub!: Subscription;
  displayMessage: { [key: string]: string } = {};
  private _validationMessages: { [key: string]: { [key: string]: string } };
  private _genericValidator: GenericValidator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    this._validationMessages = {
      taskName: {
        required: 'Task name is required.',
        minlength: 'Task name must be longer than 3 characters.',
        maxlength: 'Task name cannot be longer than 50 characters.',
      },
      dueDate: {
        required: 'Due date is required.',
      },
      priority: {
        required: 'Priority level is required.',
      },
    };

    this._genericValidator = new GenericValidator(this._validationMessages);

    this.taskEditForm = this.fb.group({
      taskName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      dueDate: ['', Validators.required],
      priorityLevel: ['', Validators.required],
      isComplete: ['', Validators.required],
      description: '',
    });
  }

  ngOnInit(): void {
    this._sub = this.route.paramMap.subscribe((params) => {
      //it knows the param after 'tasks' is what it is getting because it was defined in app module's routing :id
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.getTask(id);
    });

    // TODO: Figure this thing out
    // const resolvedData: ITaskResolved = this.route.snapshot.data['resolvedData'];
    // this.errorMessage = resolvedData.error;
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(this.taskEditForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(800))
      .subscribe((value) => {
        this.displayMessage = this._genericValidator.processMessages(this.taskEditForm);
      });
  }

  // Can use this method to make sure something saves before going back to a page
  onBack(): void {
    this.router.navigate(['/tasks']);
  }

  getTask(id: number): void {
    this.taskService.getTask(id).subscribe({
      next: (task: ITask) => this.displayTask(task),
      error: (err) => this.errorMessage = err,
    });
  }

  displayTask(task: ITask): void {
    if (this.taskEditForm) {
      this.taskEditForm.reset();
    }
    
    this.task = task;

    // matching the contents of this empty form with the database form
    this.taskEditForm.patchValue({
      taskName: this.task.taskName,
      dueDate: this.task.dueDate,
      priorityLevel: this.task.priorityLevel,
      isComplete: this.task.isComplete,
      description: this.task.description,
    });
  }

  saveTask(): void {
    if (this.taskEditForm.valid) {
      if (this.taskEditForm.dirty) {
        const p = { ...this.task, ...this.taskEditForm.value };
        this.taskService.updateTask(p).subscribe({
          next: () => this.onSaveComplete(),
        });
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct validation erros.';
    }
  }

  deleteTask(): void {
    if (this.task.id) {
      if (confirm(`Really delete the task: ${this.task.taskName}`)) {
        this.taskService.deleteTask(this.task.id).subscribe({
          next: () => this.onSaveComplete(),
          error: (err) => this.errorMessage = err
        })
      }
    }
  }

  // TODO: Add a subject stream here
  onSaveComplete() {
    this.taskEditForm.reset();
    if (this.task.isComplete) {
      this.router.navigate(['/tasks']);
    } else {
      this.router.navigate(['/completed']);
    }
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
