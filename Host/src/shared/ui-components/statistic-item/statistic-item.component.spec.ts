import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticItemComponent } from './statistic-item.component';

describe('StatisticItemComponent', () => {
  let component: StatisticItemComponent;
  let fixture: ComponentFixture<StatisticItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
