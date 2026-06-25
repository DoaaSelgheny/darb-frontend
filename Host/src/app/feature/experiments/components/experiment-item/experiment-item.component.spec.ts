import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentsItemComponent } from './experiment-item.component';

describe('HolidayHomesItemComponent', () => {
  let component: ExperimentsItemComponent;
  let fixture: ComponentFixture<ExperimentsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperimentsItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperimentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
