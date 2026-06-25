import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentPhotosComponent } from './experiment-photos.component';

describe('ExperimentPhotosComponent', () => {
  let component: ExperimentPhotosComponent;
  let fixture: ComponentFixture<ExperimentPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperimentPhotosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperimentPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
