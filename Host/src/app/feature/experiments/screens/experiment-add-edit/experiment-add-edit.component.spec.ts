import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentAddEditComponent } from './experiment-add-edit.component';

describe('ExperimentAddEditComponent', () => {
  let component: ExperimentAddEditComponent;
  let fixture: ComponentFixture<ExperimentAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperimentAddEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperimentAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
