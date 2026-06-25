import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHolidayHomeComponent } from './add-edit-holiday-home.component';

describe('AddEditHolidayHomeComponent', () => {
  let component: AddEditHolidayHomeComponent;
  let fixture: ComponentFixture<AddEditHolidayHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditHolidayHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditHolidayHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
