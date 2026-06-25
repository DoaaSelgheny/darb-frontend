import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HolidayHomesComponent } from './holiday-homes.component';

describe('HolidayHomesComponent', () => {
  let component: HolidayHomesComponent;
  let fixture: ComponentFixture<HolidayHomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayHomesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HolidayHomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
