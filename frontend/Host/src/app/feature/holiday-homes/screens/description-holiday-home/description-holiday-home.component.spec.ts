import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionHolidayHomeComponent } from './description-holiday-home.component';

describe('DescriptionHolidayHomeComponent', () => {
  let component: DescriptionHolidayHomeComponent;
  let fixture: ComponentFixture<DescriptionHolidayHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionHolidayHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DescriptionHolidayHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
