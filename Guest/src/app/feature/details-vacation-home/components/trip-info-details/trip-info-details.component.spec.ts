import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripInfoDetailsComponent } from './trip-info-details.component';

describe('TripInfoDetailsComponent', () => {
  let component: TripInfoDetailsComponent;
  let fixture: ComponentFixture<TripInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripInfoDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TripInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
