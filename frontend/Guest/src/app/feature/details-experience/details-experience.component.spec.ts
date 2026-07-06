import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsExperienceComponent } from './details-experience.component';

describe('DetailsTripComponent', () => {
  let component: DetailsExperienceComponent;
  let fixture: ComponentFixture<DetailsExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsExperienceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
