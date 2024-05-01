import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamistaComponent } from './prestamista.component';

describe('PrestamistaComponent', () => {
  let component: PrestamistaComponent;
  let fixture: ComponentFixture<PrestamistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestamistaComponent]
    });
    fixture = TestBed.createComponent(PrestamistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
