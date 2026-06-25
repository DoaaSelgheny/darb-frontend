import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFacilitiesComponent } from './home-facilities.component';

describe('HomeFacilitiesComponent', () => {
  let component: HomeFacilitiesComponent;
  let fixture: ComponentFixture<HomeFacilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFacilitiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
