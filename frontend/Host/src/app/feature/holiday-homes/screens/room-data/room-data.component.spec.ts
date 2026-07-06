import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDataComponent } from './room-data.component';

describe('RoomDataComponent', () => {
  let component: RoomDataComponent;
  let fixture: ComponentFixture<RoomDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
