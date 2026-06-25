import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentBookingDetailsComponent } from './experiment-booking-details.component';

describe('ExperimentBookingDetailsComponent', () => {
  let component: ExperimentBookingDetailsComponent;
  let fixture: ComponentFixture<ExperimentBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperimentBookingDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperimentBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
