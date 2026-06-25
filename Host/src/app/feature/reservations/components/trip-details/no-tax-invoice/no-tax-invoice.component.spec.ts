import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTaxInvoiceComponent } from './no-tax-invoice.component';

describe('NoTaxInvoiceComponent', () => {
  let component: NoTaxInvoiceComponent;
  let fixture: ComponentFixture<NoTaxInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoTaxInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoTaxInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
