import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHolidayHomeInformationComponent } from './view-holiday-home-information.component';

describe('ViewHolidayHomeInformationComponent', () => {
  let component: ViewHolidayHomeInformationComponent;
  let fixture: ComponentFixture<ViewHolidayHomeInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHolidayHomeInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewHolidayHomeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
