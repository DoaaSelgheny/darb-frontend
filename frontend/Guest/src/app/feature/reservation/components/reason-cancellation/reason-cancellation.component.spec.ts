import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonCancellationComponent } from './reason-cancellation.component';

describe('ReasonCancellationComponent', () => {
  let component: ReasonCancellationComponent;
  let fixture: ComponentFixture<ReasonCancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReasonCancellationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReasonCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
