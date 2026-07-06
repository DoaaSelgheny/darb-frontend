import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationHomeItemComponent } from './vacation-home-item.component';

describe('HolidayHomesItemComponent', () => {
  let component: VacationHomeItemComponent;
  let fixture: ComponentFixture<VacationHomeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacationHomeItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VacationHomeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
