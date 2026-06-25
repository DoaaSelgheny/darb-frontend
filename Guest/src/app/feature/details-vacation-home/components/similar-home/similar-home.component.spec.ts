import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarVacationHomeComponent } from './similar-home.component';

describe('SimilarHomeComponent', () => {
  let component: SimilarVacationHomeComponent;
  let fixture: ComponentFixture<SimilarVacationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimilarVacationHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimilarVacationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
