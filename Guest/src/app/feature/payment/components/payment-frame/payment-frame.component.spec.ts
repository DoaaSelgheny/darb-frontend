/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PaymentFrameComponent } from './payment-frame.component';

describe('PaymentFrameComponent', () => {
  let component: PaymentFrameComponent;
  let fixture: ComponentFixture<PaymentFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentFrameComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
