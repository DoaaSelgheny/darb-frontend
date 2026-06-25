import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedAccountDetailsComponent } from './updated-account-details.component';

describe('UpdatedAccountDetailsComponent', () => {
  let component: UpdatedAccountDetailsComponent;
  let fixture: ComponentFixture<UpdatedAccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatedAccountDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatedAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
