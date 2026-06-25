import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreVacationHomeComponent } from './explore-vacation-home.component';

describe('ExploreComponent', () => {
  let component: ExploreVacationHomeComponent;
  let fixture: ComponentFixture<ExploreVacationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreVacationHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreVacationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
