import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVacationHomeComponent } from './details-vacation-home.component';

describe('DetailsTripComponent', () => {
  let component: DetailsVacationHomeComponent;
  let fixture: ComponentFixture<DetailsVacationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsVacationHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsVacationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
