import { TestBed } from '@angular/core/testing';

import { TaskDetailGuard } from './task-detail.guard';

describe('TaskDetailGuard', () => {
  let guard: TaskDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TaskDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
