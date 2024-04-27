import { TestBed } from '@angular/core/testing';

import { InversionistaService } from './inversionista.service';

describe('InversionistaService', () => {
  let service: InversionistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InversionistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
