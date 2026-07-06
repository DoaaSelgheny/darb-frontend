import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeInformationComponent } from './deposite-information.component';

describe('DepositeInformationComponent', () => {
  let component: DepositeInformationComponent;
  let fixture: ComponentFixture<DepositeInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositeInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepositeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
