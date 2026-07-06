/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CouponEditComponent } from './coupon-edit.component';

describe('CouponEditComponent', () => {
  let component: CouponEditComponent;
  let fixture: ComponentFixture<CouponEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CouponEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
