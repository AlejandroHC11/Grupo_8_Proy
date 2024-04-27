import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JefeprestamistaComponent } from './jefeprestamista.component';

describe('JefeprestamistaComponent', () => {
  let component: JefeprestamistaComponent;
  let fixture: ComponentFixture<JefeprestamistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JefeprestamistaComponent]
    });
    fixture = TestBed.createComponent(JefeprestamistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
