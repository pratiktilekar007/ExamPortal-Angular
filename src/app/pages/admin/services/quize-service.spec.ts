import { TestBed } from '@angular/core/testing';

import { QuizeService } from './quize-service';

describe('QuizeService', () => {
  let service: QuizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
