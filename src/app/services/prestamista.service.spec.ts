import { TestBed } from '@angular/core/testing';

import { PrestamistaService } from './prestamista.service';

describe('PrestamistaService', () => {
  let service: PrestamistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestamistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
