import { TestBed } from '@angular/core/testing';

import { ProcessURLService } from './process-url.service';

describe('ProcessURLService', () => {
  let service: ProcessURLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessURLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
