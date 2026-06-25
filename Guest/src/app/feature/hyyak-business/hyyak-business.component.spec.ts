import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyyakBusinessComponent } from './hyyak-business.component';

describe('HyyakBusinessComponent', () => {
  let component: HyyakBusinessComponent;
  let fixture: ComponentFixture<HyyakBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HyyakBusinessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HyyakBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
