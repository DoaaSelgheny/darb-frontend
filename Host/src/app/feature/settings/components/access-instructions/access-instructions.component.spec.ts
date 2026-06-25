import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessInstructionsComponent } from './access-instructions.component';

describe('AccessInstructionsComponent', () => {
  let component: AccessInstructionsComponent;
  let fixture: ComponentFixture<AccessInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessInstructionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccessInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
