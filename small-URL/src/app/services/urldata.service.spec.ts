import { TestBed } from '@angular/core/testing';

import { URLDataService } from './urldata.service';

describe('URLDataService', () => {
  let service: URLDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(URLDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
