import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControlName } from '@angular/forms';
import { debounceTime, fromEvent, merge, Observable, Subscription } from 'rxjs';
import { ITask } from '../task';
import { TaskService } from '../task.service';
import { GenericValidator } from './generic-validator';

const setDates = (today: Date, isMin: boolean): string => {
  const todayDate = (`${today.getFullYear().toString()}-${today.getMonth().toString()}-${today.getDay().toString()}`);
  const tenYearDate = (`${(today.getFullYear()+10).toString()}-${today.getMonth().toString()}-${today.getDay().toString()}`);
  if (isMin) {
    return todayDate;
  } else {
    return tenYearDate;
  }
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  taskInputForm!: FormGroup;
  inputErrorMessage: {taskName?: string, dueDate?: string, priority?: string} = {};
  task!: ITask;
  
  // Still need to figure this part out to see if it works
  todayDate: Date = new Date();
  nowDate: string = setDates(this.todayDate, true);
  maxDate: string = setDates(this.todayDate, false);
  
  private _sub!: Subscription;
  
  private _validationMessages: { [key: string]: { [key: string]: string } };
  private _genericValidator: GenericValidator;
  
  constructor(private fb: FormBuilder, private taskService: TaskService) {
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
    }
  };

  this._genericValidator = new GenericValidator(this._validationMessages);

  this.taskInputForm = this.fb.group({
    taskName: ['', [Validators.required, Validators.minLength(3)]],
    dueDate: ['', [Validators.required]],
    priorityLevel: ['', [Validators.required]]
  });

}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    
    merge(this.taskInputForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe((value) => {
      this.inputErrorMessage = this._genericValidator.processMessages(this.taskInputForm);
    });
  }

  saveTask(): void {
    
  }

  ngOnDestroy(): void {
      this._sub.unsubscribe();
  }

}

