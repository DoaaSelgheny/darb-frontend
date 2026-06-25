import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePricesSettingsComponent } from './service-prices-settings.component';

describe('ServicePricesSettingsComponent', () => {
  let component: ServicePricesSettingsComponent;
  let fixture: ComponentFixture<ServicePricesSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicePricesSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicePricesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
