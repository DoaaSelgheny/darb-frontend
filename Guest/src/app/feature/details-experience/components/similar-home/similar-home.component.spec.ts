import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarHomeComponent } from './similar-home.component';

describe('SimilarHomeComponent', () => {
  let component: SimilarHomeComponent;
  let fixture: ComponentFixture<SimilarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimilarHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimilarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
