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
  FormGroup,
  Validators,
  AbstractControl,
  FormControlName,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, fromEvent, merge, Observable, Subscription } from 'rxjs';
import { ITask } from '../task';
import { TaskService } from '../task.service';
import { GenericValidator } from './generic-validator';

function lessThanToday(c: AbstractControl): { [key: string]: boolean } | null {
  let today: Date = new Date();

  if (new Date(c.value) < today) {
    return { "lessToday": true };
  }
  return null;
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  errorMessage = '';
  taskInputForm!: FormGroup;
  inputErrorMessage: {
    taskName?: string;
    dueDate?: string;
    priority?: string;
  } = {};
  task!: ITask;

  private _sub!: Subscription;

  private _validationMessages: { [key: string]: { [key: string]: string } };
  private _genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this._validationMessages = {
      taskName: {
        required: 'Task name is required.',
        minlength: 'Task name must be longer than 3 characters.',
        maxlength: 'Task name cannot be longer than 50 characters.',
      },
      dueDate: {
        required: 'Due date is required.',
        lessToday: 'Date should be ahead of today.'
      },
      priority: {
        required: 'Priority level is required.',
      },
    };

    this._genericValidator = new GenericValidator(this._validationMessages);

    this.taskInputForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(3)]],
      dueDate: ['', [Validators.required, lessThanToday]],
      priorityLevel: [null],
    });
  }

  ngOnInit(): void {
    this._sub = this.route.paramMap.subscribe((params) => {
      this.getTask(0);
    });
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(this.taskInputForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.inputErrorMessage = this._genericValidator.processMessages(
          this.taskInputForm
        );
      });
  }

  getTask(id: number): void {
    this.taskService.getTask(id).subscribe({
      next: (task: ITask) => this.displayTask(task),
      error: (err) => (this.errorMessage = err),
    });
  }

  displayTask(task: ITask): void {
    // This will make sure that the form has been created/loaded first
    if (this.taskInputForm) {
      this.taskInputForm.reset();
    }

    // This assigns the given task (initialised task id===0) into the stored task
    this.task = task;

    // This shall add match the form to the initialised task
    this.taskInputForm.patchValue({
      taskName: this.task.taskName,
      dueDate: this.task.dueDate,
      priorityLevel: this.task.priorityLevel,
    });
  }

  addTask(): void {
    if (this.taskInputForm.valid) {
      // p combines values of the values of the two
      // because of the initialisation, taskInputForm and task should have the same values
      // only difference is if the form did not include variables from task
      const p = { ...this.task, ...this.taskInputForm.value };
      this.taskService.createTask(p).subscribe({
        next: (task) => {
          console.log(task);
          return this.onSaveComplete();
        },
        error: (err) => (this.errorMessage = err),
      });
    }
  }

  onSaveComplete(): void {
    this.taskInputForm.reset();
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/tasks']));
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
