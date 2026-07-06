import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmDataComponent } from './modal-confirm-data.component';

describe('ModalConfirmDataComponent', () => {
  let component: ModalConfirmDataComponent;
  let fixture: ComponentFixture<ModalConfirmDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConfirmDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalConfirmDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
