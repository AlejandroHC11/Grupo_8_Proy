import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRigthComponent } from './dashboard-rigth.component';

describe('DashboardRigthComponent', () => {
  let component: DashboardRigthComponent;
  let fixture: ComponentFixture<DashboardRigthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardRigthComponent]
    });
    fixture = TestBed.createComponent(DashboardRigthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
