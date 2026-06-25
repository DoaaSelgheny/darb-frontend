import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentMeansIncludedComponent } from './experiment-means-included.component';

describe('ExperimentMeansIncludedComponent', () => {
  let component: ExperimentMeansIncludedComponent;
  let fixture: ComponentFixture<ExperimentMeansIncludedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperimentMeansIncludedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperimentMeansIncludedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
