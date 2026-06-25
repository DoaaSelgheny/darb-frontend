import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HayyakOfferComponent } from './hayyak-offer.component';

describe('HayyakOfferComponent', () => {
  let component: HayyakOfferComponent;
  let fixture: ComponentFixture<HayyakOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HayyakOfferComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HayyakOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
