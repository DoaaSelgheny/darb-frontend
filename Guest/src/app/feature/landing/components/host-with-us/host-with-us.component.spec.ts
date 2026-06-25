import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostWithUsComponent } from './host-with-us.component';

describe('HostWithUsComponent', () => {
  let component: HostWithUsComponent;
  let fixture: ComponentFixture<HostWithUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostWithUsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostWithUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
