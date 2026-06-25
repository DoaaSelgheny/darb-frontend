import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentPriceComponent } from './experiment-price.component';

describe('ExperimentPriceComponent', () => {
  let component: ExperimentPriceComponent;
  let fixture: ComponentFixture<ExperimentPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperimentPriceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperimentPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
