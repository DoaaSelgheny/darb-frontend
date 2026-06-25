import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripFeaturesComponent } from './trip-features.component';

describe('TripFeaturesComponent', () => {
  let component: TripFeaturesComponent;
  let fixture: ComponentFixture<TripFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripFeaturesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TripFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
