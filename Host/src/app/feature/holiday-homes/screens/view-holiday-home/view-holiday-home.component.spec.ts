import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHolidayHomeComponent } from './view-holiday-home.component';

describe('VewHolidayHomeComponent', () => {
  let component: ViewHolidayHomeComponent;
  let fixture: ComponentFixture<ViewHolidayHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHolidayHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewHolidayHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
