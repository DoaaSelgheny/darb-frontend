import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInOutTimeComponent } from './check-in-out-time.component';

describe('CheckInOutTimeComponent', () => {
  let component: CheckInOutTimeComponent;
  let fixture: ComponentFixture<CheckInOutTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckInOutTimeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckInOutTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
