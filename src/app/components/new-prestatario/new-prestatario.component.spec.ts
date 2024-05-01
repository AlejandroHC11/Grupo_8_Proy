import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrestatarioComponent } from './new-prestatario.component';

describe('NewPrestatarioComponent', () => {
  let component: NewPrestatarioComponent;
  let fixture: ComponentFixture<NewPrestatarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPrestatarioComponent]
    });
    fixture = TestBed.createComponent(NewPrestatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
