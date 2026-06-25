import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentLocationComponent } from './experiment-location.component';

describe('ExperimentLocationComponent', () => {
  let component: ExperimentLocationComponent;
  let fixture: ComponentFixture<ExperimentLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperimentLocationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperimentLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
