import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourismProgramsComponent } from './tourism-programs.component';

describe('TourismProgramsComponent', () => {
  let component: TourismProgramsComponent;
  let fixture: ComponentFixture<TourismProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourismProgramsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TourismProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
