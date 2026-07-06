import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesOccasionsComponent } from './prices-occasions.component';

describe('PricesOccasionsComponent', () => {
  let component: PricesOccasionsComponent;
  let fixture: ComponentFixture<PricesOccasionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricesOccasionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PricesOccasionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
