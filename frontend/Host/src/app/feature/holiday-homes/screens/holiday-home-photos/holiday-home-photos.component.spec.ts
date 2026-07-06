import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayHomePhotosComponent } from './holiday-home-photos.component';

describe('HolidayHomePhotosComponent', () => {
  let component: HolidayHomePhotosComponent;
  let fixture: ComponentFixture<HolidayHomePhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayHomePhotosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HolidayHomePhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
