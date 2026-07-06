import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrontationPopupComponent } from './confrontation-popup.component';

describe('ConfrontationPopupComponent', () => {
  let component: ConfrontationPopupComponent;
  let fixture: ComponentFixture<ConfrontationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfrontationPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfrontationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
