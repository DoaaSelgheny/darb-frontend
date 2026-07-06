import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHyyakComponent } from './about-hyyak.component';

describe('AboutHyyakComponent', () => {
  let component: AboutHyyakComponent;
  let fixture: ComponentFixture<AboutHyyakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutHyyakComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutHyyakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
