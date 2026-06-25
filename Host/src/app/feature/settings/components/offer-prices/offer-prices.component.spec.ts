import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPricesComponent } from './offer-prices.component';

describe('OfferPricesComponent', () => {
  let component: OfferPricesComponent;
  let fixture: ComponentFixture<OfferPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferPricesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
