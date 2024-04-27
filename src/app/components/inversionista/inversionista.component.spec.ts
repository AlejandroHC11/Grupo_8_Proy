import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InversionistaComponent } from './inversionista.component';

describe('InversionistaComponent', () => {
  let component: InversionistaComponent;
  let fixture: ComponentFixture<InversionistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InversionistaComponent]
    });
    fixture = TestBed.createComponent(InversionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
