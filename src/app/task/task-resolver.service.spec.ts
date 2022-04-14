import { TestBed } from '@angular/core/testing';

import { TaskResolver } from './task-resolver.service';

describe('TaskResolverService', () => {
  let service: TaskResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
