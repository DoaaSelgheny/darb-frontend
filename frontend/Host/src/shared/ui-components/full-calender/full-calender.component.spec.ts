import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCalenderComponent } from './full-calender.component';

describe('FullCalenderComponent', () => {
  let component: FullCalenderComponent;
  let fixture: ComponentFixture<FullCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullCalenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
