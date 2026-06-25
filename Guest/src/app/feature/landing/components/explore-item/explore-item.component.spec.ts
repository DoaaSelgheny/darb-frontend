import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreItemComponent } from './explore-item.component';

describe('ExploreItemComponent', () => {
  let component: ExploreItemComponent;
  let fixture: ComponentFixture<ExploreItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
