import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDetailsTripComponent } from './header-details-trip.component';

describe('HeaderDetailsTripComponent', () => {
  let component: HeaderDetailsTripComponent;
  let fixture: ComponentFixture<HeaderDetailsTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDetailsTripComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderDetailsTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
