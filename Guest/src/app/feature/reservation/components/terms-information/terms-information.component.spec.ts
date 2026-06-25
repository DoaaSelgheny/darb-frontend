import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsInformationComponent } from './terms-information.component';

describe('TermsInformationComponent', () => {
  let component: TermsInformationComponent;
  let fixture: ComponentFixture<TermsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
