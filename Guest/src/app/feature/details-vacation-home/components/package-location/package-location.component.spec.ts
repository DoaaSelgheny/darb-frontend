import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageLocationComponent } from './package-location.component';

describe('PackageLocationComponent', () => {
  let component: PackageLocationComponent;
  let fixture: ComponentFixture<PackageLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageLocationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PackageLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
