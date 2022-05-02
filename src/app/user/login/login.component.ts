import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, merge, Observable } from 'rxjs';
import { GenericValidator } from 'src/app/task/add-task/generic-validator';
import { IUser } from '../user';
import { UserService } from '../user.service';

// TODO: When user logs out, navigateByUrl should be used instead
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  userLoginForm!: FormGroup;
  inputErrorMessage: {
    username?: string;
    password?: string;
  } = {};

  users$!: Observable<IUser[]>;

  private _validationMessages: { [key: string]: { [key: string]: string } };
  private _genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this._validationMessages = {
      username: {
        required: 'Username is required.',
      },
      password: {
        required: 'Password is required.',
      },
    };

    this._genericValidator = new GenericValidator(this._validationMessages);

    this.userLoginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(this.userLoginForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.inputErrorMessage = this._genericValidator.processMessages(
          this.userLoginForm
        );
      });
  }

  login() {
    this.userService.getUsers();
  }
}
