import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiTablaComponent } from './mi-tabla.component';

describe('MiTablaComponent', () => {
  let component: MiTablaComponent;
  let fixture: ComponentFixture<MiTablaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiTablaComponent]
    });
    fixture = TestBed.createComponent(MiTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
