import { TestBed } from '@angular/core/testing';

import { JefePrestamistaService } from './jefe-prestamista.service';

describe('JefePrestamistaService', () => {
  let service: JefePrestamistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JefePrestamistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
