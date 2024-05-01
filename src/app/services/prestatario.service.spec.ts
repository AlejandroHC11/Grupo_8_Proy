import { TestBed } from '@angular/core/testing';

import { PrestatarioService } from './prestatario.service';

describe('PrestatarioService', () => {
  let service: PrestatarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestatarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
