import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayHomesItemComponent } from './holiday-homes-item.component';

describe('HolidayHomesItemComponent', () => {
  let component: HolidayHomesItemComponent;
  let fixture: ComponentFixture<HolidayHomesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayHomesItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HolidayHomesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
