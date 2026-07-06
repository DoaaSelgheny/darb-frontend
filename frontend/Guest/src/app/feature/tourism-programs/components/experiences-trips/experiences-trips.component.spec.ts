import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesTripsComponent } from './experiences-trips.component';

describe('ExperiencesTripsComponent', () => {
  let component: ExperiencesTripsComponent;
  let fixture: ComponentFixture<ExperiencesTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperiencesTripsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperiencesTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
