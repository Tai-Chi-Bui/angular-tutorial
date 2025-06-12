import { TestBed } from '@angular/core/testing';

import { Animals } from './animals';

describe('Animals', () => {
  let service: Animals;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Animals);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
