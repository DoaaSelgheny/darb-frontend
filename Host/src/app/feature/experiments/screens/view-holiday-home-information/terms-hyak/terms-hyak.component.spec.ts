import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsHyakComponent } from './terms-hyak.component';

describe('TermsHyakComponent', () => {
  let component: TermsHyakComponent;
  let fixture: ComponentFixture<TermsHyakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsHyakComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermsHyakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
