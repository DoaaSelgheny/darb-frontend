import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationPricesComponent } from './vacation-prices.component';

describe('VacationPricesComponent', () => {
  let component: VacationPricesComponent;
  let fixture: ComponentFixture<VacationPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacationPricesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VacationPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
