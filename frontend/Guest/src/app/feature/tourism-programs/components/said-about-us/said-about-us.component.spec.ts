import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidAboutUsComponent } from './said-about-us.component';

describe('SaidAboutUsComponent', () => {
  let component: SaidAboutUsComponent;
  let fixture: ComponentFixture<SaidAboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaidAboutUsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SaidAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
