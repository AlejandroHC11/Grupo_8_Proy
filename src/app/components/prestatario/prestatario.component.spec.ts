import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestatarioComponent } from './prestatario.component';

describe('PrestatarioComponent', () => {
  let component: PrestatarioComponent;
  let fixture: ComponentFixture<PrestatarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestatarioComponent]
    });
    fixture = TestBed.createComponent(PrestatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
