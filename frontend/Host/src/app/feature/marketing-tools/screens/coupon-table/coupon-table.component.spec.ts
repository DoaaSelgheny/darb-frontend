/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CouponTableComponent } from './coupon-table.component';

describe('CouponTableComponent', () => {
  let component: CouponTableComponent;
  let fixture: ComponentFixture<CouponTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CouponTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
