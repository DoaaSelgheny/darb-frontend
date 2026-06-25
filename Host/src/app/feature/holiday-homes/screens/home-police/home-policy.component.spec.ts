import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesPhotosComponent } from './home-policy.component';

describe('FacilitiesPhotosComponent', () => {
  let component: FacilitiesPhotosComponent;
  let fixture: ComponentFixture<FacilitiesPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilitiesPhotosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FacilitiesPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
