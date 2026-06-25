import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificVerificationTypeComponent } from './specific-verification-type.component';

describe('SpecificVerificationTypeComponent', () => {
  let component: SpecificVerificationTypeComponent;
  let fixture: ComponentFixture<SpecificVerificationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificVerificationTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecificVerificationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
