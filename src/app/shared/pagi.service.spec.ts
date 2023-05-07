import { TestBed } from '@angular/core/testing';

import { PagiService } from './pagi.service';

describe('PagiService', () => {
  let service: PagiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
